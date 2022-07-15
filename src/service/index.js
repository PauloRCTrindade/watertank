import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://onesignal.com/api/v1/notifications',
  headers: {
    Accept: 'application/json',
    Authorization: 'Basic ZTcxZWFiMDYtYTc2OC00OTY3LWIzYTUtYTZlZTE0YjcxOGZl',
    'Content-Type': 'application/json'
  },
  data: {
    included_segments: ['Subscribed Users'],
    contents: {en: 'asasasasas', es: 'Spanish Message'},
    name: 'INTERNAL_CAMPAIGN_NAME'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});



