const db = require("../../data/db-config")

function find() {
  // FROM schemes
  return db("schemes")
  // SELECT schemes.scheme_id, schemes.scheme_name,
  .select("schemes.scheme_id", "schemes.scheme_name")
  // COUNT(steps.scheme_id) as number_of_steps
  .count("steps.scheme_id as number_of_steps")
  // LEFT JOIN steps
  // ON schemes.scheme_id = steps.scheme_id
  .leftJoin("steps", "schemes.scheme_id", "steps.scheme_id")
  // GROUP BY steps.scheme_id
  .groupBy("steps.scheme_id")
  // ORDER BY schemes.scheme_id ASC
  .orderBy("schemes.scheme_id", "asc")

  // SELECT schemes.scheme_id, schemes.scheme_name,
  // COUNT(steps.scheme_id) as number_of_steps
  // FROM schemes
  // LEFT JOIN steps
  // ON schemes.scheme_id = steps.scheme_id
  // GROUP BY steps.scheme_id
  // ORDER BY schemes.scheme_id ASC
}

async function findById(scheme_id) { // EXERCISE B
  /*
      [
        {
          "scheme_id": 1,
          "scheme_name": "World Domination",
          "step_id": 2,
          "step_number": 1,
          "instructions": "solve prime number theory"
        },
        {
          "scheme_id": 1,
          "scheme_name": "World Domination",
          "step_id": 1,
          "step_number": 2,
          "instructions": "crack cyber security"
        },
        // etc
      ]
      
    4B- Using the array obtained and vanilla JavaScript, create an object with
    the structure below, for the case _when steps exist_ for a given `scheme_id`:

      {
        "scheme_id": 1,
        "scheme_name": "World Domination",
        "steps": [
          {
            "step_id": 2,
            "step_number": 1,
            "instructions": "solve prime number theory"
          },
          {
            "step_id": 1,
            "step_number": 2,
            "instructions": "crack cyber security"
          },
          // etc
        ]
      }

    5B- This is what the result should look like _if there are no steps_ for a `scheme_id`:

      {
        "scheme_id": 7,
        "scheme_name": "Have Fun!",
        "steps": []
      }
  */  // FROM schemes
      const schemesArray = await db("schemes")
        // SELECT schemes.scheme_id, schemes.scheme_name,
        // steps.step_id, steps.step_number, steps.instructions
        .select("schemes.scheme_id", "schemes.scheme_name", "steps.step_id", "steps.step_number", "steps.instructions")
        // LEFT JOIN steps
        // ON schemes.scheme_id = steps.scheme_id
        .leftJoin("steps", "schemes.scheme_id", "steps.scheme_id")
        // WHERE schemes.scheme_id = 1
        .where("schemes.scheme_id", scheme_id)
        // ORDER BY steps.step_number ASC
        .orderBy("steps.step_number", "asc")

      const result = {
        scheme_id: schemesArray[0].scheme_id,
        scheme_name: schemesArray[0].scheme_name,
        steps: schemesArray
          .filter((item) => item.step_id !== null)
          .map(item => ({ 
            step_id: item.step_id,
            step_number: item.step_number, 
            instructions: item.instructions, 
          }))
      }
      return result

      // SELECT schemes.scheme_id, schemes.scheme_name,
      // steps.step_id, steps.step_number, steps.instructions
      // FROM schemes
      // LEFT JOIN steps
      // ON schemes.scheme_id = steps.scheme_id
      // WHERE schemes.scheme_id = 1
      // ORDER BY steps.step_number ASC
}

function findSteps(scheme_id) { 
  // FROM steps
  return db("steps")
  .where("steps.scheme_id", scheme_id)
  // SELECT steps.step_id, steps.step_number,
  // steps.instructions, schemes.scheme_name
  .select("steps.step_id", "steps.step_number", "steps.instructions", "schemes.scheme_name")
  // JOIN schemes
  // ON schemes.scheme_id = steps.scheme_id
  .join("schemes", "schemes.scheme_id", "steps.scheme_id")
  // ORDER BY steps.step_number
  .orderBy("steps.step_number")

// SELECT steps.step_id, steps.step_number,
// steps.instructions, schemes.scheme_name
// FROM steps
// JOIN schemes
// ON schemes.scheme_id = steps.scheme_id
// ORDER BY steps.step_number
}

function add(scheme) { // EXERCISE D
  // return db("schemes")
  // .insert(scheme)
  // .then((id) => {
  //   return findById(id[0])
  // })
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

//FOR checkSchemeId MIDDLEWARE ONLY
function doesSchemeExist(scheme_id) {
  return db("schemes")
  .where("scheme_id", scheme_id)
  .first()
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  doesSchemeExist
}
