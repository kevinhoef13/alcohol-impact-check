/**
 * BAC band to effects mapping with plain-English descriptions
 */

import { BacBandKey } from "./types";

export interface BacEffects {
  label: string;
  effects: string[];
  effectsDetail: string[];
  sleepSummary: string;
  sleepTonight: string[];
  tomorrow: string[];
  whatHelps: string[];
}

/**
 * Map BAC bands to typical effects
 * Uses neutral, informational tone with "typically", "may", "often"
 */
export const BAC_EFFECTS_MAP: Record<BacBandKey, BacEffects> = {
  baseline: {
    label: "<0.01% BAC",
    effects: [
      "No measurable alcohol effects typically present",
      "Cognitive and motor functions may remain at baseline",
      "Normal physiological state is maintained",
    ],
    effectsDetail: [
      "Attention and focus typically remain sharp",
      "Physical coordination is generally unaffected",
      "Decision-making processes operate normally",
      "Mood and emotional regulation may be stable",
    ],
    sleepSummary: "Sleep quality is typically not affected by alcohol at this level.",
    sleepTonight: [
      "Sleep onset and duration may proceed normally",
      "Sleep architecture typically remains undisturbed",
      "REM and deep sleep stages may occur as usual",
    ],
    tomorrow: [
      "You may wake feeling normally rested",
    ],
    whatHelps: [
      "Continue normal sleep hygiene practices",
      "Maintain your regular bedtime routine",
    ],
  },

  b01_02: {
    label: "0.01–0.02% BAC",
    effects: [
      "Effects are often subtle or unnoticeable to most individuals",
      "Slight relaxation or mood changes may occur",
      "Motor and cognitive functions typically remain intact",
    ],
    effectsDetail: [
      "Body temperature may feel slightly warmer",
      "Social ease or comfort may increase subtly",
      "Reaction times remain largely normal",
      "Self-awareness and perception are typically unaffected",
    ],
    sleepSummary: "Sleep may experience minimal changes in some individuals.",
    sleepTonight: [
      "Sleep onset may be slightly easier for some people",
      "Sleep architecture may show very minor changes",
      "Light sleep stages might slightly increase",
    ],
    tomorrow: [
      "Most people wake feeling normal",
      "Subtle grogginess may occur in sensitive individuals",
    ],
    whatHelps: [
      "Drink water before bed to stay hydrated",
      "Keep your sleeping environment comfortable",
    ],
  },

  b03_04: {
    label: "0.03–0.04% BAC",
    effects: [
      "Mild relaxation and mild euphoria may be experienced",
      "Inhibitions may begin to lower slightly",
      "Concentration may be minimally affected in some tasks",
    ],
    effectsDetail: [
      "Social confidence may feel enhanced",
      "Minor tasks requiring focus may take slightly longer",
      "Mood may become more elevated or positive",
      "Fine motor control typically remains functional",
      "Judgment in low-stakes situations may be subtly affected",
    ],
    sleepSummary: "Sleep architecture may show slight changes, with minor disruptions possible.",
    sleepTonight: [
      "Falling asleep may feel easier initially",
      "Sleep may become more fragmented in the second half of the night",
      "REM sleep may be slightly reduced",
      "You might wake once or twice more than usual",
    ],
    tomorrow: [
      "Minor grogginess or mild headache may occur",
      "Cognitive function is typically normal or near-normal",
    ],
    whatHelps: [
      "Drink water to reduce dehydration effects",
      "Avoid checking screens if you wake during the night",
      "Allow extra time for morning routine if needed",
    ],
  },

  b05_06: {
    label: "0.05–0.06% BAC",
    effects: [
      "Judgment and reasoning may become noticeably impaired",
      "Coordination and reaction time often begin to decline",
      "Social behavior and talkativeness typically increase",
    ],
    effectsDetail: [
      "Risk assessment may become less accurate",
      "Balance and steadiness may show subtle changes",
      "Inhibitions around social interaction often decrease",
      "Complex problem-solving abilities may be reduced",
      "Emotional responses may be more pronounced",
      "Vision tracking and focus may become slightly impaired",
    ],
    sleepSummary: "Sleep disruption becomes more common, with REM sleep often reduced.",
    sleepTonight: [
      "Sleep onset may be faster, but overall quality often suffers",
      "REM sleep suppression typically occurs",
      "Waking in the early morning hours is more likely",
      "You may experience vivid dreams or restlessness as alcohol metabolizes",
    ],
    tomorrow: [
      "Grogginess or foggy thinking may persist into the morning",
      "Mild dehydration headache is possible",
    ],
    whatHelps: [
      "Hydrate with water before sleeping and upon waking",
      "Eat a light snack if your stomach feels empty",
      "Consider a gentle stretch or short walk in the morning",
    ],
  },

  b07_08: {
    label: "0.07–0.08% BAC",
    effects: [
      "Motor control and balance may be moderately affected",
      "Reasoning and memory formation often show impairment",
      "Reaction times typically slow noticeably",
    ],
    effectsDetail: [
      "Walking may require more focus and attention",
      "Short-term memory formation may be compromised",
      "Speech may become less precise or slightly slurred",
      "Self-control and impulse regulation often decrease",
      "Peripheral vision and depth perception may be affected",
      "Processing speed for information typically slows",
    ],
    sleepSummary: "Sleep quality often suffers, with reduced REM sleep and more frequent awakenings.",
    sleepTonight: [
      "Deep sleep in the first half may be followed by fragmented, lighter sleep",
      "REM sleep is often significantly reduced",
      "Temperature regulation may be affected, leading to sweating or chills",
      "Multiple awakenings during the night are common",
    ],
    tomorrow: [
      "Fatigue and grogginess are typical in the morning",
      "Concentration and memory may be subtly impaired",
      "Mild to moderate headache often occurs",
    ],
    whatHelps: [
      "Drink water or electrolyte beverages to rehydrate",
      "Eat a balanced breakfast when you feel ready",
      "Avoid overcommitting to demanding tasks if possible",
    ],
  },

  b09_10: {
    label: "0.09–0.10% BAC",
    effects: [
      "Speech may become slurred in many individuals",
      "Fine motor skills and coordination are typically impaired",
      "Judgment and self-control often deteriorate significantly",
    ],
    effectsDetail: [
      "Complex motor tasks become significantly more difficult",
      "Emotional volatility may increase noticeably",
      "Attention span and focus are often substantially reduced",
      "Risk-taking behaviors may become more common",
      "Memory gaps for events during this period may occur later",
      "Balance and gait typically show clear impairment",
    ],
    sleepSummary: "Sleep architecture is typically disrupted with poor overall sleep quality.",
    sleepTonight: [
      "You may fall asleep quickly but wake frequently",
      "REM sleep suppression is common, followed by REM rebound later",
      "Sleep may feel unrefreshing despite time in bed",
      "Nausea or discomfort may interfere with rest",
    ],
    tomorrow: [
      "You may wake feeling unrested and fatigued",
      "Headache, nausea, and sensitivity to light or sound are common",
      "Cognitive tasks may feel more challenging",
    ],
    whatHelps: [
      "Rehydrate steadily throughout the morning",
      "Rest in a dark, quiet room if possible",
      "Light food like toast or crackers may help settle your stomach",
    ],
  },

  b11_12: {
    label: "0.11–0.12% BAC",
    effects: [
      "Gross motor skills may be significantly compromised",
      "Memory formation often becomes impaired",
      "Emotional regulation typically decreases",
    ],
    effectsDetail: [
      "Standing and walking without support may be challenging",
      "Blackout periods (memory loss) may begin to occur",
      "Nausea and dizziness are increasingly common",
      "Reaction times are severely slowed",
      "Confusion and disorientation may be present",
      "Decision-making capacity is typically severely impaired",
    ],
    sleepSummary: "Deep and REM sleep stages are often significantly reduced, with next-day fatigue common.",
    sleepTonight: [
      "Sleep may be highly fragmented with frequent awakenings",
      "Deep sleep and REM sleep are typically suppressed",
      "Early waking (3-5 AM) is common as alcohol metabolizes",
      "Physical discomfort, sweating, or rapid heartbeat may occur",
    ],
    tomorrow: [
      "You may feel exhausted despite hours in bed",
      "Headache, dehydration, and nausea are likely",
      "Mood may be low, and irritability is common",
    ],
    whatHelps: [
      "Focus on gentle rehydration with water or electrolyte drinks",
      "Avoid strenuous activity until you feel better",
      "Rest as much as your schedule allows",
    ],
  },

  b13_14: {
    label: "0.13–0.14% BAC",
    effects: [
      "Balance and walking may require concentration or assistance",
      "Reaction time is typically severely slowed",
      "Vision may be affected, including blurred or double vision",
    ],
    effectsDetail: [
      "Physical assistance may be needed for safe movement",
      "Memory blackouts become more likely",
      "Nausea and vomiting are common",
      "Comprehension and communication are typically impaired",
      "Risk of injury from falls increases substantially",
    ],
    sleepSummary: "Sleep is often heavily disrupted with minimal restorative value.",
    sleepTonight: [
      "Sleep may be extremely fragmented and unrefreshing",
      "Nausea, sweating, or rapid heartbeat may prevent restful sleep",
      "You may wake very early and struggle to fall back asleep",
      "Dehydration effects often worsen sleep quality",
    ],
    tomorrow: [
      "Significant fatigue, headache, and nausea are typical",
      "Cognitive and physical performance may be noticeably impaired",
      "Recovery may take most of the day",
    ],
    whatHelps: [
      "Sip water or electrolyte drinks slowly and consistently",
      "Eat bland, easy-to-digest foods when tolerated",
      "Prioritize rest and avoid demanding obligations",
    ],
  },

  b15_16: {
    label: "0.15–0.16% BAC",
    effects: [
      "Gross motor impairment is typically severe",
      "Blackout periods (memory loss) may begin to occur",
      "Nausea and vomiting often become more likely",
    ],
    effectsDetail: [
      "Standing or walking may be impossible without assistance",
      "Awareness and consciousness may be intermittent",
      "Risk of choking on vomit becomes a serious concern",
      "Vital signs may show changes (heart rate, breathing)",
      "Complete memory loss for this period is common",
      "Medical attention may be advisable",
    ],
    sleepSummary: "Loss of consciousness may occur rather than natural sleep.",
    sleepTonight: [
      "Sleep is often replaced by periods of unconsciousness",
      "Risk of vomiting during sleep increases significantly",
      "Breathing and heart rate may be affected",
      "Sleep position matters—lying on your side is safer",
    ],
    tomorrow: [
      "Severe hangover symptoms are likely, including nausea and headache",
      "Memory gaps from the previous night may occur",
      "Physical and mental recovery may take a full day or longer",
    ],
    whatHelps: [
      "Rehydrate slowly and steadily throughout the day",
      "Have someone check on you periodically if possible",
      "Seek medical advice if symptoms are severe or concerning",
    ],
  },

  b17_18: {
    label: "0.17–0.18% BAC",
    effects: [
      "Walking and standing may become very difficult without support",
      "Confusion and disorientation are often present",
      "Risk of injury from falls typically increases substantially",
    ],
    effectsDetail: [
      "Loss of consciousness may occur at any moment",
      "Breathing may become shallow or irregular",
      "Pain response and reflexes are often significantly dulled",
      "Temperature regulation is typically impaired",
      "Someone should stay with you to monitor your safety",
      "Medical evaluation may be warranted",
    ],
    sleepSummary: "Consciousness may be difficult to maintain; this is severe intoxication rather than healthy sleep.",
    sleepTonight: [
      "You may lose consciousness rather than sleep naturally",
      "Risk of choking on vomit is a serious concern",
      "Vital signs should be monitored by others if possible",
      "Sleep position is critical—lie on your side, not your back",
    ],
    tomorrow: [
      "Severe physical symptoms including nausea, vomiting, and intense headache are common",
      "Cognitive function may be significantly impaired",
      "Full recovery often takes more than a day",
    ],
    whatHelps: [
      "Have someone stay with you to monitor your condition",
      "Rehydrate cautiously if nausea allows",
      "Seek medical attention if you have severe symptoms or concerns",
    ],
  },

  b19_20: {
    label: "0.19–0.20% BAC",
    effects: [
      "Mental confusion and stupor are typically severe",
      "Blackouts and memory loss often occur",
      "Physical assistance may be required for basic functions",
    ],
    effectsDetail: [
      "Unresponsiveness or near-unresponsiveness is common",
      "Breathing and heart rate may be dangerously affected",
      "Risk of aspiration (choking on vomit) is very high",
      "Hypothermia risk increases significantly",
      "You should not be alone at this level",
      "Emergency medical care should be strongly considered",
    ],
    sleepSummary: "Loss of consciousness is common at this level; medical attention may be appropriate.",
    sleepTonight: [
      "Unconsciousness is likely, not restorative sleep",
      "Vital functions may be dangerously depressed",
      "You should not be left alone at this level",
      "Emergency medical evaluation may be warranted",
    ],
    tomorrow: [
      "Severe and prolonged hangover symptoms are expected",
      "Memory loss for portions of the previous night is common",
      "Physical recovery may take multiple days",
    ],
    whatHelps: [
      "Do not sleep alone—ensure someone can monitor you",
      "Seek medical attention if symptoms worsen or do not improve",
      "Rehydrate carefully and rest as much as possible",
    ],
  },

  b21_24: {
    label: "0.21–0.24% BAC",
    effects: [
      "Severe depression of physical and mental functions typically occurs",
      "Loss of consciousness may happen at any time",
      "Medical supervision is often advisable at this level",
    ],
    effectsDetail: [
      "Respiratory depression becomes a significant risk",
      "Gag reflex may be suppressed or absent",
      "Body temperature regulation is often severely impaired",
      "Seizure risk may be elevated",
      "Continuous monitoring by another person is essential",
      "This level warrants immediate medical evaluation",
    ],
    sleepSummary: "This represents a medical concern rather than sleep; close monitoring is recommended.",
    sleepTonight: [
      "Unconsciousness or unresponsiveness is very likely",
      "Breathing may become slow or irregular",
      "Risk of medical emergency is significant",
      "Someone should monitor you continuously",
    ],
    tomorrow: [
      "Severe physical and cognitive impairment may persist",
      "Medical evaluation is recommended even if you feel better",
      "Complete recovery may take several days",
    ],
    whatHelps: [
      "Do not sleep alone—continuous monitoring is important",
      "Seek immediate medical care if breathing is irregular or you cannot be roused",
      "Follow up with a healthcare provider even after symptoms improve",
    ],
  },

  b25_plus: {
    label: "≥0.25% BAC",
    effects: [
      "Life-threatening complications may occur including respiratory depression",
      "Loss of consciousness and unresponsiveness are common",
      "Immediate medical attention is typically necessary",
    ],
    effectsDetail: [
      "Respiratory arrest (stopped breathing) may occur",
      "Heart rate may become dangerously slow or irregular",
      "Coma is a significant risk at this level",
      "Death from alcohol poisoning is possible",
      "This is a medical emergency—call 911 immediately",
    ],
    sleepSummary: "This is a medical emergency requiring immediate professional care.",
    sleepTonight: [
      "This is not sleep—this is a life-threatening condition",
      "Breathing may stop or become dangerously slow",
      "Immediate emergency medical care is needed",
      "Call 911 without delay",
    ],
    tomorrow: [
      "Medical care and monitoring will likely continue",
      "Recovery requires professional supervision",
    ],
    whatHelps: [
      "Call 911 immediately—this is a medical emergency",
      "Do not leave the person alone while waiting for help",
      "Seek help if you experience confusion, can't be woken, have slow breathing (fewer than 8 breaths per minute), or have blue-tinged skin",
    ],
  },
};

/**
 * Get effects for a specific BAC band
 */
export function getEffectsForBand(bandKey: BacBandKey): BacEffects {
  return BAC_EFFECTS_MAP[bandKey];
}
