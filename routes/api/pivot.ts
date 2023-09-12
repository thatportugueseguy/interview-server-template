import { Router, response } from 'express';

type PivotRequest = {
  url: string;
  column_name: string;
};

const router = Router();
const agesListData: number[][] = [];

router.post('/', async (req, res, next) => {
  try {
    //read the body
    const requestBody: PivotRequest = req.body;

    // TODO validate payload url and file requisites

    // fetch csv resource
    const urlToFetch = requestBody.url;
    const fetchResponse = await fetch(urlToFetch);
    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // parse csv manually
    const csv = await fetchResponse.text();
    const [headersText, ...columns] = csv.split('\n');

    // get the headers clean. Strip double quotes and extra spaces
    const headers = headersText
      .split(',')
      .map((v) => v.replace(/"/g, '').trim());
    const ageHeaderIndex = headers.indexOf('Age');

    const agesList: number[] = [];
    // iterate columns and create an array with ages values
    for (const column of columns) {
      const columnsValues = column.split(',').map((v) => v.trim());

      // Some columns are not as long as the other ones, so we need to check that we don't get undefined
      // This is likely some edge case due to manual CSV parsing, so we'd want to use a solid csv lib here
      const columnText = columnsValues[ageHeaderIndex];
      if (columnText === undefined) {
        continue;
      }

      const valueToStore = Number(columnText.trim());
      agesList.push(valueToStore);
    }

    // Using array size so we can have id = 1 when the stored index is 0.
    // This needs to be accomodated on the get request
    const dataId = agesListData.push(agesList);

    return res.status(201).send(String(dataId));
  } catch (e) {
    // TODO deal properly with the error
    console.error('Pivot Endpoint,POST request. Error: ', (e as Error).message);
    next(e);
  }
});

router.get('/:id', async (req, res) => {
  // Todo do more validations on the input if needed
  // Validate at least that we are getting an integer in the valid range
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id < 1) {
    return res.sendStatus(400);
  }

  // we have to subtract 1 from the parsed id to get the correct array index
  // in the agesListData array. Check POST endpoint above for explanation
  const correctArrayIndex = id - 1;

  const agesListArray = agesListData[correctArrayIndex];
  if (agesListArray === undefined) {
    return res.sendStatus(404);
  }

  return res.json(agesListArray);
});

export default router;
