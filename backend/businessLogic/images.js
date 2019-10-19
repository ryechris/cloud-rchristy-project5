import { IAccess } from '../dataLayer/images';

const iAccess = new IAccess(process.env.IMAGES_TABLE);

export async function getBUrl(a, b, c) {
  return iAccess.getBUrl(a, b, c);
};

export async function getPUrl(a, b) {
  return iAccess.getPUrl(a, b);
};

export async function getImages(user) {
  return iAccess.getImages(user);
}

export async function userExists(user) {
  return iAccess.userExists(user);
}
