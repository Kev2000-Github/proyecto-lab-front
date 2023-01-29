import * as yup from 'yup'
import { validationUser } from '../utils/constants';


export const userSchema = yup
  .object({
    username: yup.string().required(validationUser.USERNAME_REQUIRED_YUP),
    password: yup.string().required(validationUser.PASSWORD_REQUIRED_YUP),
    subsidiaryId: yup.string().required(validationUser.SUBSIDIARY_REQUIRED_YUP)
  })
  .required()
