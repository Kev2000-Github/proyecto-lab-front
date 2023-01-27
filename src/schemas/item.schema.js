import * as yup from 'yup'
import { validationItems } from '../utils/constants';


export const userSchema = yup
  .object({
    name: yup.string().required(validationItems.NAME_REQUIRED_YUP),
    description: yup.string().required(validationItems.DESCRIPTION_REQUIRED_YUP),
    photo: yup.string().required(validationItems.PHOTO_REQUIRED_YUP),
    code: yup.string().required(validationItems.CODE_REQUIRED_YUP),
  })
  .required()
