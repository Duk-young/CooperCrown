import { combineReducers } from 'redux';
import account from './account.reducer';
import product from './product.reducer';
import products from './products.reducer';
import service from './service.reducer';
import services from './services.reducer';
import contact from './contact.reducer';
import contacts from './contacts.reducer';
import discount from './discount.reducer';
import discounts from './discounts.reducer';
import doctor from './doctor.reducer';
import doctors from './doctors.reducer';
import user from './user.reducer';
import users from './users.reducer';
import emails from './email.reducer'

const reducer = combineReducers({
  products,
  account,
  product,
  service,
  services,
  contact,
  contacts,
  discount,
  discounts,
  doctor,
  doctors,
  user,
  users,
  emails
});

export default reducer;
