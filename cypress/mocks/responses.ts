import {mockPerson, mockStarship} from "../../src/shared/mocks/game.mocks";

export const peopleGameResponses = [{
  statusCode: 200,
  body: {
    message: 'ok',
    result: {
      description: 'testDesc1',
      properties: {...mockPerson, mass: '100', name: 'personTest1'},
      uid: '1'
    },
  }
}, {
  statusCode: 200,
  body: {
    message: 'ok',
    result: {
      description: 'testDesc2',
      properties: {...mockPerson, mass: '200', name: 'personTest2'},
      uid: '2'
    },
  }
}, {
  statusCode: 200,
  body: {
    message: 'ok',
    result: {
      description: 'testDesc1',
      properties: {...mockPerson, mass: '200', name: 'personTest1'},
      uid: '1'
    },
  }
}, {
  statusCode: 200,
  body: {
    message: 'ok',
    result: {
      description: 'testDesc2',
      properties: {...mockPerson, mass: '100', name: 'personTest2'},
      uid: '2'
    },
  }
},
  {
    statusCode: 200,
    body: {
      message: 'ok',
      result: {
        description: 'testDesc1',
        properties: {...mockPerson, mass: '100', name: 'personTest1'},
        uid: '1'
      },
    }
  }, {
    statusCode: 200,
    body: {
      message: 'ok',
      result: {
        description: 'testDesc2',
        properties: {...mockPerson, mass: '200', name: 'personTest2'},
        uid: '2'
      },
    }
  },
];

export const starshipGameResponses = [{
  statusCode: 200,
  body: {
    message: 'ok',
    result: {
      description: 'testDesc1',
      properties: {...mockStarship, crew: '10', name: 'starshipTest1'},
      uid: '1'
    },
  }
}, {
  statusCode: 200,
  body: {
    message: 'ok',
    result: {
      description: 'testDesc2',
      properties: {...mockStarship, crew: '20', name: 'starshipTest2'},
      uid: '2'
    },
  }
}, {
  statusCode: 200,
  body: {
    message: 'ok',
    result: {
      description: 'testDesc1',
      properties: {...mockStarship, crew: '20', name: 'starshipTest1'},
      uid: '1'
    },
  }
}, {
  statusCode: 200,
  body: {
    message: 'ok',
    result: {
      description: 'testDesc2',
      properties: {...mockStarship, crew: '20', name: 'starshipTest2'},
      uid: '2'
    },
  }
},
  {
    statusCode: 200,
    body: {
      message: 'ok',
      result: {
        description: 'testDesc1',
        properties: {...mockStarship, crew: '50', name: 'starshipTest1'},
        uid: '1'
      },
    }
  }, {
    statusCode: 200,
    body: {
      message: 'ok',
      result: {
        description: 'testDesc2',
        properties: {...mockStarship, crew: '50', name: 'starshipTest2'},
        uid: '2'
      },
    }
  },
  {
    statusCode: 200,
    body: {
      message: 'ok',
      result: {
        description: 'testDesc1',
        properties: {...mockStarship, crew: '1', name: 'starshipTest1'},
        uid: '1'
      },
    }
  }, {
    statusCode: 200,
    body: {
      message: 'ok',
      result: {
        description: 'testDesc2',
        properties: {...mockStarship, crew: '1', name: 'starshipTest2'},
        uid: '2'
      },
    }
  },
];
