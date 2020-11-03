# Query builder UI.
Deployed here: https://query-builder-react-ts.herokuapp.com/

### Run locally
- Install dependencies: `npm install`
- Run on `localhost:3000`: `npm run`
- Run tests: `npm run test`
- View test coverage report: `npm test -- --coverage --watchAll=false`

### deploy to heroku via CLI
- `heroku login`
- `git push heroku branchname:master`

### Tech
- ReactJS used with Typescript
- Project initialized using `create-react-app` with the Typescript template
- `react-select` is used for dropdowns

### Component Docs
**1.MultiValueInputSelector:**
- An input box which can have multiple values
- Unlike a multi-select dropdown, values are individually typed and added by the user. There's no dropdown
- Currently supports only `number` as input type. Can easily extend to add support for other types.
- For type number, accepts a rule of `min` and `max` numbers.
- Extra rules can be passed, and handled by extending the code, without changing the existing code.
- Accepts props: 
    ```typescript
        interface Props {
            values?: Array<number>,
            onChange?: (newRhs: Array<number>) => void,
            type: "number", // can add support for other types later
            rules?: rulesType
        }`
    ```

**2.QueryBuilder:**
- A component which can create multiple queries, each having 3 attributes: `LHS`, `Operator` & `RHS`
- `LHS` & `Operator` are dropdowns with multiple options.
- The `RHS` can be of multiple types: `"text" | "number" | "multi-select-list" | "multi-select-numbers-in-a-range"`
- The types and possible values for `Operator` & `RHS` are different for each possible value in `LHS`.
- The component accepts a config which specifies the different possible values for `LHS`, and the possible values for `Operator` & `RHS` for that `LHS`. (The config for the current implementation is at: `queryConfig/queryConfig.tsx`)
- When `RHS` type is `multi-select-list`, a JSON file can be provided, which is used to provide options to the dropdown
- When `RHS` type is `multi-select-numbers-in-a-range`, the custom component `MultiValueInputSelector` is used.
- Any new functionality can be added first in the config, and then the code can be extended to provide support for it.
- Types for the config file:
    ```typescript
        interface Operator {
            value: string;
            text: string;
        }

        export interface Row {
            label: string,
            operators: Array<Operator>;
            rhs: {
                type: "text" | "number" | "multi-select-list" | "multi-select-numbers-in-a-range";
                config?: string;
            }
        }

        // This is the type the provided config should follow
        export interface ConfigType {
            [key: string]: Row;
        }
    ```

### Other features
- Queries can be saved with a name (in the localStorage)
- Saved queries can be applied later.

### Approach for testing:
- Using `react-testing-library` with `jest` for unit and integration tests.
- Most of the tests are integration tests with some unit tests in important places.
- The philosophy behind `react-testing-library` makes sense to me, testing from the user's perspective. Testing the rendered output based on user's actions instead of only testing the internal implementation.

### What could be better?
**Testing:**
 - The code written for the tests can be improved. Currrently there is some redundancy around the way tests are written
 - I might have missed some edge cases.
 - Can write some accessibilty tests with `jest-axe`

**Styles:**
 - Can separate presentational compoenents into their own.
 - Can use the styles-components approach. I haven't put much efforts into managing the styles. Most styles are dumped into `SavedQuries.css` without much though.
 - Can make some components configurable for their styles.

**Functionality:**
 - Validations can be done in a better way. Currently only the `MultiValueInputSelector` component has proper validations. Some central level validation schema can be setup. (I like https://github.com/jquense/yup).
 - The UX around saving a named query can be improved. Currently when user clicks on `Save for later`, it's not very apparent that the query gets saved.
 - Functionality for removing saved queries can be added.

**Code:**
 - Types that are common across multiple files can be managed in a better way.
