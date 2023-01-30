import * as yup from 'yup'
import { validationUser } from '../utils/constants';


export const userSchema = yup
  .object({
    username: yup.string().required(validationUser.USERNAME_REQUIRED_YUP),
    password: yup.string().required(validationUser.PASSWORD_REQUIRED_YUP),
    subsidiaryId: yup.string().required(validationUser.SUBSIDIARY_REQUIRED_YUP)
  })
  .required()

  export const editUserSchema = yup
  .object({
    username: yup.string().required(validationUser.USERNAME_REQUIRED_YUP),
    password: yup.string(),
    subsidiaryId: yup.string().required(validationUser.SUBSIDIARY_REQUIRED_YUP)
  })
  .required()
