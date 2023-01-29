import * as yup from 'yup'
import { validationItems } from '../utils/constants';


export const groupSchema = yup
  .object({
    name: yup.string().required(validationItems.NAME_REQUIRED_YUP),
  })
  .required()
