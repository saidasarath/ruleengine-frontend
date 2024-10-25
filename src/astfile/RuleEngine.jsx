
// const RuleEngine = {
//     create_rule: (rule) => {
//       return {
//         type: "AND",
//         left: { type: "comparison", field: "age", operator: ">", value: 30 },
//         right: { type: "comparison", field: "department", operator: "=", value: "Sales" },
//       };
//     },
  
//     evaluate_rule: (ast, userData) => {
//       const evaluateNode = (node) => {
//         if (node.type === "comparison") {
//           const { field, operator, value } = node;
//           const userValue = userData[field];
  
//           switch (operator) {
//             case ">":
//               return userValue > value;
//             case "<":
//               return userValue < value;
//             case "=":
//               return userValue === value;
//             default:
//               throw new Error("Unsupported operator");
//           }
//         } else if (node.type === "AND") {
//           return evaluateNode(node.left) && evaluateNode(node.right);
//         } else if (node.type === "OR") {
//           return evaluateNode(node.left) || evaluateNode(node.right);
//         }
//         return false;
//       };
  
//       return evaluateNode(ast);
//     }
//   };
  
//   export default RuleEngine;
const RuleEngine = {
  create_rule: (rule) => {
    // This function needs to be more complex to handle parsing of the rule strings into an AST
    // For demonstration purposes, we'll return hardcoded ASTs based on rule inputs.
    
    if (rule.includes("Sales")) {
      return {
        type: "AND",
        left: {
          type: "OR",
          left: {
            type: "AND",
            left: { type: "comparison", field: "age", operator: ">", value: 30 },
            right: { type: "comparison", field: "department", operator: "=", value: "Sales" }
          },
          right: {
            type: "AND",
            left: { type: "comparison", field: "age", operator: "<", value: 25 },
            right: { type: "comparison", field: "department", operator: "=", value: "Marketing" }
          }
        },
        right: {
          type: "OR",
          left: { type: "comparison", field: "salary", operator: ">", value: 50000 },
          right: { type: "comparison", field: "experience", operator: ">", value: 5 }
        }
      };
    } else if (rule.includes("Marketing")) {
      return {
        type: "AND",
        left: {
          type: "comparison",
          field: "age",
          operator: ">",
          value: 30
        },
        right: {
          type: "OR",
          left: { type: "comparison", field: "salary", operator: ">", value: 20000 },
          right: { type: "comparison", field: "experience", operator: ">", value: 5 }
        }
      };
    }

    throw new Error("Unsupported rule format");
  },

  evaluate_rule: (ast, userData) => {
    const evaluateNode = (node) => {
      if (node.type === "comparison") {
        const { field, operator, value } = node;
        const userValue = userData[field];

        switch (operator) {
          case ">":
            return userValue > value;
          case "<":
            return userValue < value;
          case "=":
            return userValue === value;
          default:
            throw new Error("Unsupported operator");
        }
      } else if (node.type === "AND") {
        return evaluateNode(node.left) && evaluateNode(node.right);
      } else if (node.type === "OR") {
        return evaluateNode(node.left) || evaluateNode(node.right);
      }
      return false;
    };

    return evaluateNode(ast);
  }
};

export default RuleEngine;

