/**
 * Calculates the percentage of a value relative to a reference value.
 *
 * @param {number} value - The value to be converted to a percentage.
 * @param {number} ref - The reference value used as the base for the percentage calculation.
 * @returns {number} - The calculated percentage of the value relative to the reference value.
 * @throws {Error} - Throws an error if the reference value (ref) is zero.
 */
export const toPercent = (value: number, ref: number): number => {
    // Check if ref is zero to avoid division by zero
    if (ref === 0) {
        throw new Error("Reference value (ref) cannot be zero.");
    }

    // Calculate the percentage
    const percent = (value / ref) * 100;

    // Return the result
    return percent;
};
