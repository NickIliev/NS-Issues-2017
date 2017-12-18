export const person = {
    name: {
      label: 'Name',
      value: 'Juri',
      type: 'text',
      cssClass: 'red',
      validation: {
        required: true
      }
    },
    age: {
      label: 'Age',
      value: 32,
      type: 'text',
      cssClass: 'green',
    },
    gender: {
      label: 'Gender',
      value: 'M',
      type: 'radio',
      cssClass: 'green',
      options: [
        { label: 'Male', value: 'M'},
        { label: 'Female', value: 'F'}
      ]
    }, 
    city: {
      label: 'City',
      value: '39010',
      type: 'select',
      cssClass: 'red',
      options: [
        { label: '(choose one)', value: ''},
        { label: 'Bolzano', value: '39100'},
        { label: 'Meltina', value: '39010'},
        { label: 'Appiano', value: '39057'}
      ],
      validation: {
        required: true
      }
    }
  }