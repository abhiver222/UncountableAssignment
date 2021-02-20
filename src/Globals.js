const ingredientMap = {
  "polymers": ["Polymer 1", "Polymer 2", "Polymer 3", "Polymer 4"],
  "carbon": ["Carbon Black High Grade", "Carbon Black Low Grade"],
  "silica": ["Silica Filler 1", "Silica Filler 2"],
  "plasticizer": ["Plasticizer 1", "Plasticizer 2"],
  "coAgent": ["Co-Agent 1", "Co-Agent 2", "Co-Agent 3"],
  "curingAgent": ["Curing Agent 1", "Curing Agent 2"]
}

// color map to keep the ingredient coloring constant throughtout the website
// for better priming for the end user
const colorMap = {
  "Polymer 1": "red",
  "Polymer 2": "green",
  "Polymer 3": "blue",
  "Polymer 4": "yellow",
  "Carbon Black High Grade": "black",
  "Carbon Black Low Grade": "white",
  "Silica Filler 1": "pink",
  "Silica Filler 2": "maroon",
  "Plasticizer 1": "orange",
  "Plasticizer 2": "gray",
  "Plasticizer 3": "violet",
  "Antioxidant": "yellow",
  "Coloring Pigment": "red",
  "Co-Agent 1": "aqua",
  "Co-Agent 2": "magenta",
  "Co-Agent 3": "tomato",
  "Curing Agent 1": "slateblue",
  "Curing Agent 2": "beige",
  "Oven Temperature": "blue",
  "Viscosity": "red",
  "Cure Time": "blue",
  "Elongation": "green",
  "Tensile Strength": "yellow",
  "Compression Set": "white"
}

export const globals = {
  ingredientMap: ingredientMap,
  colorMap: colorMap
}
