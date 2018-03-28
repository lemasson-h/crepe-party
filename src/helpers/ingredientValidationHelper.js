//math.eval()
const quantityTypes = {
  teaspoon: {
    defaultType: 'tsp',
    regex: /^\s*(\d+(?:\.\d+)?)\s*(?:t|(?:tsp\.?)|(?:teaspoon))\s*$/,
    conversion: {
      milliliter: ':r: * 5',
    },
  },
  tablespoon: {
    defaultType: 'tbsp',
    regex: /^\s*(\d+(?:\.\d+)?)\s*(?:T|(?:tbl\.?)|(?:tbs\.?)|(?:tbsp\.?))\s*$/,
    conversion: {
      milliliter: ':r: * 15',
    },
  },
  fluidOunce: {
    defaultType: 'fl oz',
    regex: /^\s*(\d+(?:\.\d+)?)\s*(?:fl\s+oz)\s*$/,
    conversion: {
      tablespoon: ':r: * 2',
      milliliter: ':r: * 2 * 15',
    },
  },
  milliliter: {
    defaultType: 'ml',
    regex: /^\s*(\d+)\s*(?:(?:ml)|(?:milliliter)|(?:millilitre)|(?:cc)|(?:mL))\s*$/,
    conversion: {
      liter: ':r: / 1000.00',
      deciliter: ':r: / 100.00',
      milligram: ':r:',
    }
  },
  liter: {
    defaultType: 'l',
    regex: /^\s*(\d+(?:\.\d{1,2})?)\s*(?:(?:l)|(?:liter)|(?:litre)|(?:L))\s*$/,
    conversion: {
      gram: ':r:',
    },
  },
  deciliter: {
    defaultType: 'dl',
    regex: /^\s*(\d+)\s*(?:(?:dl)|(?:deciliter)|(?:decilitre)|(?:dL))\s*$/,
    conversion: {
      liter: ':r: / 10.00',
    },
  },
  pound: {
    defaultType: 'lb',
    regex: /^\s*(\d+(?:\.\d+))?\s*(?:(?:pound)|(?:lb)|(?:#))\s*$/,
    conversion: {
      gram: ':r: * 453.59237',
      kilogram: ':r: * 0.45359237',
    }
  },
  ounce: {
    defaultType: 'oz',
    regex: /^\s*(\d+(?:\.\d+)?)\s*(?:(?:ounce)|(?:oz))\s*$/,
    conversion: {
      gram: ':r: * 28.349523125',
      kilogram: ':r: * 0.028349523125',
    }
  },
  milligram: {
    defaultType: 'mg',
    regex: /^\s*(\d+)\s*(?:(?:mg)|(?:milligram)|(?:milligramme))\s*$/,
    conversion: {
      milliliter: ':r:',
    },
  },
  gram: {
    defaultType: 'g',
    regex: /^\s*(\d+(?:\.\d{1,2})?)\s*(?:(?:g)|(?:gram)|(?:gramme))\s*$/,
    conversion: {
      liter: ':r:',
    },
  },
  kilogram: {
    defaultType: 'kg',
    regex: /^\s*(\d+(?:\.\d{1,2})?)\s*(?:(?:kg)|(?:kilogram)|(?:kilogramme))\s*$/,
  },
  quantity: {
    regex: /^\s*(\d+)\s*$/,
  }
};

export const transformIngredientQuantityToObject = (value) => {
  let matches;

  const quantityType = Object.keys(quantityTypes).find(quantityTypeKey => {
    const regex = quantityTypes[quantityTypeKey].regex;

    matches = value.match(regex);

    return matches !== null;
  });

  if (quantityType !== undefined) {
    return {
      type: quantityType,
      value: matches[1],
    };
  }

  return undefined;
}

export const transformObjectToIngredientQuantity = (quantity) => {
  if (typeof quantity === 'object' && undefined !== quantityTypes[quantity.type]) {
    const type = quantityTypes[quantity.type];

    return quantity.value + (undefined !== type.defaultType ? ' ' + type.defaultType : '');
  }

  return quantity;
}
