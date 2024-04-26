import { getRandomArrayElement } from '../utils.js';

export const offers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '8f6c9af5-f36e-4ffb-8a5c-f0b562663b51',
        title: 'Upgrade to a business class',
        price: 57,
      },
      {
        id: 'f7c9c53c-19d4-43ba-af3b-1d161e05c76b',
        title: 'Choose the radio station',
        price: 163,
      },
      {
        id: 'd1882060-24c3-4777-9146-7190bd98b8f3',
        title: 'Choose temperature',
        price: 105,
      },
      {
        id: '92c11bf4-84f4-45eb-a73b-7f6a7d74e2ef',
        title: 'Drive quickly, I am in a hurry',
        price: 39,
      },
      {
        id: 'dc8d4807-7551-4b96-8e4a-1fcdbef8fb27',
        title: 'Drive slowly',
        price: 92,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: '72d19c66-363b-4331-9b04-f5be29453c8f',
        title: 'Infotainment system',
        price: 98,
      },
      {
        id: '0af97b1f-f661-47d6-ba01-20cfd1c92fa1',
        title: 'Order meal',
        price: 145,
      },
      {
        id: 'b324c4b9-b8f5-4d2e-bd31-25e92596421b',
        title: 'Choose seats',
        price: 132,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: '77bde583-dfb3-416e-8a2d-b4adfac6bb4c',
        title: 'Book a taxi at the arrival point',
        price: 199,
      },
      {
        id: '96b350e2-5139-4074-9e2b-54cfd61bd092',
        title: 'Order a breakfast',
        price: 154,
      },
      {
        id: 'c6dbf27e-d2c2-429c-95f7-523914fe849d',
        title: 'Wake up at a certain time',
        price: 68,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: '55960949-a6cb-4b59-8bc9-226132f515a4',
        title: 'Choose meal',
        price: 75,
      },
      {
        id: '20cfc449-5c1b-4d7e-a4b9-7fdd44bbcd1e',
        title: 'Choose seats',
        price: 181,
      },
      {
        id: 'e5af71d8-4996-424e-9c52-b42b7a48a90b',
        title: 'Upgrade to comfort class',
        price: 48,
      },
      {
        id: 'cf5d1a10-f72b-4651-a8cf-4af292bed982',
        title: 'Upgrade to business class',
        price: 52,
      },
      {
        id: '47fba2cf-9d93-4c4c-8e17-08e475348066',
        title: 'Add luggage',
        price: 188,
      },
      {
        id: 'f58c1d52-9123-4830-984c-45c8b562f447',
        title: 'Business lounge',
        price: 127,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'cd4fc4fe-a1bd-4a50-bfd8-3e9ef5706360',
        title: 'Choose the time of check-in',
        price: 31,
      },
      {
        id: '40f391a3-4a4d-4e2e-9cac-852325548369',
        title: 'Choose the time of check-out',
        price: 46,
      },
      {
        id: 'ad25c7c7-24e2-412e-a368-15f2f4521bbe',
        title: 'Add breakfast',
        price: 105,
      },
      {
        id: '853fde41-bf31-42d8-ac00-b642cc833c82',
        title: 'Laundry',
        price: 200,
      },
      {
        id: '8d6936da-7e15-4b96-a3fb-06c862cc8616',
        title: 'Order a meal from the restaurant',
        price: 164,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'ship',
    offers: [
      {
        id: '19c1ac7f-e49f-4288-9b6e-49cf6981908e',
        title: 'Choose meal',
        price: 193,
      },
      {
        id: 'cfaaa669-6125-4f8f-834b-c0a1ba620cb5',
        title: 'Choose seats',
        price: 150,
      },
      {
        id: 'bad66aad-74e0-4d08-8f54-4d0e28da6d08',
        title: 'Upgrade to comfort class',
        price: 141,
      },
      {
        id: 'ee3249dd-3f1b-409b-a4cc-9772e113f248',
        title: 'Upgrade to business class',
        price: 48,
      },
      {
        id: '894081bf-40fe-4d98-bbec-9960bafe7355',
        title: 'Add luggage',
        price: 157,
      },
      {
        id: '947d16f3-72ac-464d-bdd7-65e4ab02e2e8',
        title: 'Business lounge',
        price: 77,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: '74dd107e-1847-42af-b693-b8a9da90b995',
        title: 'With automatic transmission',
        price: 89,
      },
      {
        id: 'b47012a6-400f-4c06-bef5-9830d559ee1f',
        title: 'With air conditioning',
        price: 142,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '2e11da63-2a77-49cf-9b97-0ef062321f3b',
        title: 'Choose live music',
        price: 191,
      },
      {
        id: 'e830c09e-147c-479e-87d7-ecf36bb87d57',
        title: 'Choose VIP area',
        price: 124,
      },
    ],
  },
];

export const getRandomOffer = () => getRandomArrayElement(offers);
