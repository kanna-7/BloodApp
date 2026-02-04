/**
 * Blood donation eligibility based on weight and height
 * Min weight: 45 kg (WHO/NHS standard)
 * BMI range: 18.5 - 29.9 (healthy to slightly overweight acceptable)
 */
export function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100
  return weightKg / (heightM * heightM)
}

export function checkEligibility(weightKg, heightCm, age = 25) {
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
    return { eligible: false, reason: 'Invalid weight or height' }
  }

  if (age < 18 || age > 65) {
    return { eligible: false, reason: 'Age must be between 18 and 65 years' }
  }

  if (weightKg < 45) {
    return {
      eligible: false,
      reason: `Weight must be at least 45 kg (yours: ${weightKg} kg)`,
    }
  }

  const bmi = calculateBMI(weightKg, heightCm)
  const bmiRounded = Math.round(bmi * 10) / 10

  if (bmi < 18.5) {
    return {
      eligible: false,
      reason: `BMI too low (${bmiRounded}). Minimum 18.5 required for donation.`,
    }
  }

  if (bmi > 29.9) {
    return {
      eligible: false,
      reason: `BMI too high (${bmiRounded}). Maximum 29.9 for donation.`,
    }
  }

  return {
    eligible: true,
    bmi: bmiRounded,
    reason: `You are eligible! BMI: ${bmiRounded} (healthy range)`,
  }
}
