import * as yup from 'yup'
import { validationItems } from '../utils/constants';


export const itemSchema = yup
  .object({
    name: yup.string().required(validationItems.NAME_REQUIRED_YUP),
    description: yup.string(),
    photo: yup.string(),
    code: yup.string().required(validationItems.CODE_REQUIRED_YUP),
    groups: yup.array()
  })
  .required()

export const editItemSchema = yup
  .object({
    name: yup.string(),
    description: yup.string(),
    photo: yup.string(),
    code: yup.string().required(validationItems.CODE_REQUIRED_YUP),
    groups: yup.array()
  })
  .required()
