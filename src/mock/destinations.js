import { getRandomArrayElement } from '../utils.js';

const destinations = [
  {
    id: '8dea8526-da47-436a-935a-5b87a85a66e7',
    description: 'Munich - middle-eastern paradise',
    name: 'Munich',
    pictures: [],
  },
  {
    id: '045d93aa-7e8a-48fd-9e5d-a80a044f069c',
    description: '',
    name: 'Saint Petersburg',
    pictures: [],
  },
  {
    id: '6af7585c-65c1-4289-a431-221a9ed3065f',
    description: '',
    name: 'Helsinki',
    pictures: [],
  },
  {
    id: '74e80ed9-a1eb-4fd0-bf83-df53d4a90ce9',
    description:
      'Rome - with an embankment of a mighty river as a centre of attraction',
    name: 'Rome',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Rome middle-eastern paradise',
      },
    ],
  },
  {
    id: 'a40ca73c-a954-425d-9152-28fd14a664ff',
    description: 'Barcelona - in a middle of Europe',
    name: 'Barcelona',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/18.jpg',
        description: 'Barcelona middle-eastern paradise',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Barcelona with a beautiful old town',
      },
    ],
  },
  {
    id: 'fd57cf0e-28d0-448c-ad87-1dbe8fa35b1e',
    description:
      'Madrid - famous for its crowded street markets with the best street food in Asia',
    name: 'Madrid',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/18.jpg',
        description:
          'Madrid famous for its crowded street markets with the best street food in Asia',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Madrid for those who value comfort and coziness',
      },
    ],
  },
  {
    id: '75468aac-6a82-4e32-ab0e-9d69b9a529d7',
    description: 'Sochi - a perfect place to stay with a family',
    name: 'Sochi',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/2.jpg',
        description: 'Sochi for those who value comfort and coziness',
      },
    ],
  },
  {
    id: '48fb0649-12c0-44c7-ad79-a02c72716d1c',
    description:
      'Valencia - famous for its crowded street markets with the best street food in Asia',
    name: 'Valencia',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/15.jpg',
        description:
          'Valencia with an embankment of a mighty river as a centre of attraction',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Valencia in a middle of Europe',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/13.jpg',
        description: 'Valencia for those who value comfort and coziness',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/3.jpg',
        description: 'Valencia with a beautiful old town',
      },
    ],
  },
  {
    id: '4603472b-8dd1-4b37-b223-cfc27bf43ff9',
    description: 'Paris - is a beautiful city',
    name: 'Paris',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/13.jpg',
        description: 'Paris with a beautiful old town',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/11.jpg',
        description: 'Paris is a beautiful city',
      },
    ],
  },
  {
    id: 'fc0aeb47-60b4-433a-a40b-80aa92969a48',
    description: '',
    name: 'Milan',
    pictures: [],
  },
];

export const getRandomDestination = () => getRandomArrayElement(destinations);
