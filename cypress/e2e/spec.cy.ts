describe(' Ninja Code Test Cases', () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
        accuracy: 1
      }
    };
  
    const mockAddress = "New York, NY, USA";
    const mockRestaurants = {
      data: {
        nearByRestaurants: {
          restaurants: [
            {
              _id: "1",
              name: "Test Restaurant",
              address: "123 Test Street",
              deliveryTime: 30,
              minimumOrder: 15,
              rating: 4.5,
              isAvailable: true,
              tax: 10,
              categories: [{ _id: "1", title: "Test Category", foods: [] }],
              reviewData: { ratings: 4.5, total: 100 },
              openingTimes: {
                day: "Monday",
                times: [{ startTime: ["09:00"], endTime: ["17:00"] }]
              }
            }
          ]
        }
      }
    };
  
    beforeEach(() => {
      // Stub geolocation
      cy.window().then((win) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((success) => {
          success(mockPosition);
        });
      });
  
      // Stub OpenStreetMap API
      cy.intercept('GET', 'https://nominatim.openstreetmap.org/reverse*', {
        statusCode: 200,
        body: {
          display_name: mockAddress
        }
      });
  
      // Stub GraphQL endpoint
      cy.intercept('POST', 'https://enatega-multivendor.up.railway.app/graphql', (req) => {
        if (req.body.operationName === 'restaurantList') {
          req.reply(mockRestaurants);
        }
      });
  
      cy.visit('/');
    });
  
    it('1. Should get and display user location', () => {
      cy.get('[data-testid="share-location-btn"]').click();
      
      // Verify address in input
      cy.get('[data-testid="address-input"]').should('have.value', mockAddress);
      
      // Verify location in header dropdown
      cy.get('[data-testid="header-location"]').should('contain', mockAddress);
    });
  
    it('2. Should display location in text area and dropdown', () => {
      cy.get('[data-testid="address-input"]').should('have.value', '');
      cy.get('[data-testid="share-location-btn"]').click();
      
      cy.get('[data-testid="address-input"]')
        .should('have.value', mockAddress)
        .and('be.visible');
  
      cy.get('[data-testid="header-location"]')
        .should('contain', mockAddress)
        .and('be.visible');
    });
  
    it('3. Should query restaurants endpoint with coordinates', () => {
      cy.get('[data-testid="find-restaurants-btn"]').click();
      
      cy.wait('@gqlQuery').then((interception) => {
        expect(interception.request.body.variables).to.deep.equal({
          latitude: mockPosition.coords.latitude,
          longitude: mockPosition.coords.longitude
        });
      });
    });
  
    it('4. Should display restaurants in grid format', () => {
      cy.get('[data-testid="find-restaurants-btn"]').click();
      
      cy.get('[data-testid="restaurants-grid"]')
        .should('be.visible')
        .within(() => {
          cy.get('[data-testid="restaurant-card"]')
            .should('have.length.at.least', 1)
            .first()
            .should('contain', 'Test Restaurant')
            .and('contain', '123 Test Street');
        });
    });
  
    it('5. Should show loading states during location fetch', () => {
      cy.get('[data-testid="find-restaurants-btn"]').click();
      cy.get('[data-testid="loader"]').should('be.visible');
      
      cy.get('[data-testid="restaurants-grid"]').should('be.visible');
      cy.get('[data-testid="loader"]').should('not.exist');
    });
  });