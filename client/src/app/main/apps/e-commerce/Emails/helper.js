import moment from 'moment';

export const findDuplicates = (array) => array.filter((item, index) => array.indexOf(item) === index)

export const uniqueElements = (array) => findDuplicates(array);

export const validateAgeRange = (selectedFilters, customers) => {
  const age_range = selectedFilters.ageRange
  let data = [];

  age_range.forEach(filter => {
    for (let i = 0; i < customers.length; i++) {
      const age = moment().diff(customers[i].dob.toDate(), 'years');

      if (filter === 'Age between 90+' && age >= 90) {
        data.push(customers[i])
      } else if (filter === 'Age between 85 - 89' && age >= 85 && age <= 89) {
        data.push(customers[i])
      } else if (filter === 'Age between 80 - 84' && age >= 80 && age <= 84) {
        data.push(customers[i])
      } else if (filter === 'Age between 75 - 79' && age >= 75 && age <= 79) {
        data.push(customers[i])
      } else if (filter === 'Age between 70 - 74' && age >= 70 && age <= 74) {
        data.push(customers[i])
      } else if (filter === 'Age between 65 - 69' && age >= 65 && age <= 69) {
        data.push(customers[i])
      } else if (filter === 'Age between 60 - 64' && age >= 60 && age <= 64) {
        data.push(customers[i])
      } else if (filter === 'Age between 55 - 59' && age >= 55 && age <= 59) {
        data.push(customers[i])
      } else if (filter === 'Age between 50 - 54' && age >= 50 && age <= 54) {
        data.push(customers[i])
      } else if (filter === 'Age between 45 - 49' && age >= 45 && age <= 49) {
        data.push(customers[i])
      } else if (filter === 'Age between 40 - 44' && age >= 40 && age <= 44) {
        data.push(customers[i])
      } else if (filter === 'Age between 35 - 39' && age >= 35 && age <= 39) {
        data.push(customers[i])
      } else if (filter === 'Age between 30 - 34' && age >= 30 && age <= 34) {
        data.push(customers[i])
      } else if (filter === 'Age between 25 - 29' && age >= 25 && age <= 29) {
        data.push(customers[i])
      } else if (filter === 'Age between 20 - 24' && age >= 20 && age <= 24) {
        data.push(customers[i])
      } else if (filter === 'Age between 15 - 19' && age >= 15 && age <= 19) {
        data.push(customers[i])
      } else if (filter === 'Age between 10 - 14' && age >= 10 && age <= 14) {
        data.push(customers[i])
      } else if (filter === 'Age between 5 - 9' && age >= 5 && age <= 9) {
        data.push(customers[i])
      } else if (filter === 'Age between 0 - 4' && age >= 0 && age <= 4) {
        data.push(customers[i])
      }
    }
  });

  return data
};

export const states = [
  {
    name: 'Alabama',
    abbreviation: 'AL'
  },
  {
    name: 'Alaska',
    abbreviation: 'AK'
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ'
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR'
  },
  {
    name: 'California',
    abbreviation: 'CA'
  },
  {
    name: 'Colorado',
    abbreviation: 'CO'
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT'
  },
  {
    name: 'Delaware',
    abbreviation: 'DE'
  },
  {
    name: 'Florida',
    abbreviation: 'FL'
  },
  {
    name: 'Georgia',
    abbreviation: 'GA'
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI'
  },
  {
    name: 'Idaho',
    abbreviation: 'ID'
  },
  {
    name: 'Illinois',
    abbreviation: 'IL'
  },
  {
    name: 'Indiana',
    abbreviation: 'IN'
  },
  {
    name: 'Iowa',
    abbreviation: 'IA'
  },
  {
    name: 'Kansas',
    abbreviation: 'KS'
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY'
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA'
  },
  {
    name: 'Maine',
    abbreviation: 'ME'
  },
  {
    name: 'Maryland',
    abbreviation: 'MD'
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA'
  },
  {
    name: 'Michigan',
    abbreviation: 'MI'
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN'
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS'
  },
  {
    name: 'Missouri',
    abbreviation: 'MO'
  },
  {
    name: 'Montana',
    abbreviation: 'MT'
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE'
  },
  {
    name: 'Nevada',
    abbreviation: 'NV'
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH'
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ'
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM'
  },
  {
    name: 'New York',
    abbreviation: 'NY'
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC'
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND'
  },
  {
    name: 'Ohio',
    abbreviation: 'OH'
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK'
  },
  {
    name: 'Oregon',
    abbreviation: 'OR'
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA'
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI'
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC'
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD'
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN'
  },
  {
    name: 'Texas',
    abbreviation: 'TX'
  },
  {
    name: 'Utah',
    abbreviation: 'UT'
  },
  {
    name: 'Vermont',
    abbreviation: 'VT'
  },
  {
    name: 'Virginia',
    abbreviation: 'VA'
  },
  {
    name: 'Washington',
    abbreviation: 'WA'
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV'
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI'
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY'
  }
];
