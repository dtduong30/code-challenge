/**
  * 3 unique implementations of the following function in TypeScript.
  * Comment on the complexity or efficiency of each function.
 */

/**
 * Complexity: 
 * - Time: O(1)
 * - Space: O(1)
 */
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

/**
 * Complexity: 
 * - Time: O(n)
 * - Space: O(1)
 */
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * Complexity: 
 * - Time: O(n)
 * - Space: O(n)
 */
function sum_to_n_c(n: number): number {
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
}

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
