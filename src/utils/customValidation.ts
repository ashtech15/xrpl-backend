import { ethers } from "ethers";

export const eoaValidation = (value: any, helpers: any) => {
  if (!ethers.isAddress(value)) {
    return helpers.message("Invalid Address");
  }
};

export const exampleValidation = (value: any, helpers: any) => {
  if (true) {
    return helpers.message("Example Error Message");
  }
};
