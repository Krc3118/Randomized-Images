import {
  DATE_BOUNDARIES, ENDPOINT_PREFIX, MAX_PAGE, QUERY_SIZE,
} from './constants';

function generateRandomInt(min, max) {
  const roundedMin = Math.ceil(min);
  const roundedMax = Math.floor(max);
  return Math.floor(Math.random() * (roundedMax - roundedMin)) + roundedMin;
}

function generateRandomDate(dateBoundaries) {
  const {
    minYear, maxYear, minMonth, maxMonth, minDay, maxDay,
  } = dateBoundaries;

  const year = generateRandomInt(minYear, maxYear);
  const month = generateRandomInt(minMonth, maxMonth);
  const day = generateRandomInt(minDay, maxDay);

  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
}

function generateApiEndpoint() {
  const date = generateRandomDate(DATE_BOUNDARIES);
  const page = generateRandomInt(1, MAX_PAGE);

  return `${ENDPOINT_PREFIX}&page=${page}&date=${date}&per_page=${QUERY_SIZE}`;
}

function urlFromProperties(farmId, serverId, id, secret) {
  return `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_q.jpg`;
}

async function fetchRawImages() {
  const response = await fetch(generateApiEndpoint());

  if (response.status !== 200) {
    throw new Error('There was a problem fetching images');
  }

  const rawJson = await response.text();

  const imagesJson = JSON.parse(rawJson.slice(14, -1));

  return imagesJson.photos.photo;
}

// eslint-disable-next-line import/prefer-default-export
export async function fetchImageUrls() {
  const rawImages = await fetchRawImages();

  return rawImages.map((image) => urlFromProperties(
    image.farm, image.server, image.id, image.secret,
  ));
}
