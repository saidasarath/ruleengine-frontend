// api.js
import RuleEngine from './RuleEngine';

export const createRule = (ruleString) => {
  const ast = RuleEngine.create_rule(ruleString);
  return ast;
};

export const combineRules = (ruleStrings) => {
  const asts = ruleStrings.map(RuleEngine.create_rule);
  return RuleEngine.combine_rules(asts);
};

export const evaluateRule = (ast, data) => {
  return RuleEngine.evaluate_rule(ast, data);
};