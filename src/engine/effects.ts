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
      "Divided attention typically remains unaffected",
      "Reaction time to unexpected events is at baseline",
      "Visual tracking and peripheral vision function normally",
    ],
    effectsDetail: [
      "Multitasking abilities (monitoring traffic while adjusting controls) typically operate at baseline",
      "Emergency response time and decision-making remain sharp",
      "Depth perception and distance judgment are generally accurate",
      "Information processing speed is unaffected",
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
      "Divided attention may show very subtle changes in complex tasks",
      "Reaction time typically remains near baseline levels",
      "Visual tracking abilities are generally unaffected",
    ],
    effectsDetail: [
      "Multitasking during complex activities may be minimally affected",
      "Response to sudden events (avoiding obstacles) typically remains quick",
      "Peripheral vision and hazard detection generally function normally",
      "Judgment about speed and distance remains largely accurate",
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
      "Divided attention (tracking multiple objects while making decisions) may begin to decline",
      "Reaction time to unexpected hazards often shows measurable slowing",
      "Visual tracking of moving objects may be mildly affected",
    ],
    effectsDetail: [
      "Multitasking abilities (monitoring surroundings while controlling equipment) often decline slightly",
      "Emergency response decisions may take slightly longer",
      "Peripheral vision awareness and hazard detection may decrease",
      "Judgment about speed, distance, and timing may be affected",
      "Information processing speed often shows subtle reduction",
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
      "Divided attention becomes noticeably impaired (difficulty managing multiple tasks simultaneously)",
      "Reaction time to sudden events typically slows significantly",
      "Visual tracking and peripheral vision often show clear reduction",
    ],
    effectsDetail: [
      "Multitasking abilities (scanning environment while controlling movement) are typically impaired",
      "Emergency response time and decision quality may be notably affected",
      "Tracking moving objects and detecting hazards in peripheral view often difficult",
      "Judgment about speed, distance, and appropriate gaps becomes less reliable",
      "Information processing and decision speed typically slow",
      "Coordination for precise control movements may decline",
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
      "Divided attention is significantly impaired (managing multiple tasks becomes difficult)",
      "Reaction time to unexpected situations is markedly slower",
      "Visual tracking and ability to detect peripheral hazards are notably reduced",
    ],
    effectsDetail: [
      "Multitasking (monitoring environment, processing information, controlling movement) becomes severely compromised",
      "Emergency response decisions are slower and often less effective",
      "Tracking moving objects and maintaining visual focus typically difficult",
      "Judgment about speed, distance, timing, and safe gaps is frequently poor",
      "Information processing speed and decision-making are substantially slowed",
      "Precise coordination and smooth control movements typically impaired",
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
      "Divided attention is severely impaired (inability to manage multiple simultaneous demands)",
      "Reaction time becomes dangerously slow and unpredictable",
      "Visual tracking is significantly compromised; peripheral hazard detection often fails",
    ],
    effectsDetail: [
      "Multitasking essential for complex activities (monitoring, deciding, responding) is severely degraded",
      "Emergency response time and decision quality are typically very poor",
      "Tracking moving objects and maintaining visual awareness becomes highly unreliable",
      "Judgment about speed, distance, and timing is frequently severely impaired",
      "Information processing and decision-making are dramatically slowed",
      "Coordination and control precision are substantially compromised",
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
      "Divided attention capacity is critically impaired (unable to process multiple inputs)",
      "Reaction times are severely delayed; emergency responses often fail",
      "Visual processing and hazard recognition typically grossly impaired",
    ],
    effectsDetail: [
      "Multitasking abilities are effectively absent for complex tasks",
      "Emergency response decisions and actions are typically unreliable",
      "Visual tracking and spatial awareness are severely compromised",
      "Judgment about motion, distance, and appropriate responses is critically impaired",
      "Information processing speed becomes extremely slow",
      "Motor control and coordination are significantly degraded",
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
      "Attention and awareness are profoundly diminished (cannot track even single tasks reliably)",
      "Reaction times are extremely impaired; protective responses often absent",
      "Visual perception is severely distorted; hazard recognition typically fails",
    ],
    effectsDetail: [
      "Cognitive processing for any complex activity is typically non-functional",
      "Emergency responses are unreliable or absent",
      "Spatial awareness and visual judgment are severely compromised",
      "Decision-making capacity is profoundly impaired",
      "Motor coordination is typically grossly inadequate for controlled movement",
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
      "Cognitive functions are severely depressed (minimal awareness or processing)",
      "Reaction capacity is effectively absent; no protective responses",
      "Visual and sensory processing typically non-functional",
    ],
    effectsDetail: [
      "Mental processing for any purposeful activity is typically absent",
      "Awareness of surroundings and hazards is profoundly impaired",
      "Consciousness may be intermittent",
      "Motor control is typically inadequate for any coordinated movement",
      "Risk of serious injury due to inability to respond to danger",
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
      "Cognitive awareness is critically compromised (minimal to no conscious processing)",
      "Protective reflexes and responses are often absent or severely delayed",
      "Sensory processing and awareness of environment typically absent",
    ],
    effectsDetail: [
      "Mental functioning for any activity is typically non-existent",
      "Loss of consciousness may occur at any time",
      "Ability to recognize or respond to danger is absent",
      "Breathing and heart rate may become irregular",
      "Someone should monitor you continuously",
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
      "Consciousness and cognitive function are typically absent or minimal",
      "Life-preserving reflexes may be dangerously suppressed",
      "Awareness and response capacity are typically non-existent",
    ],
    effectsDetail: [
      "Unresponsiveness or near-unresponsiveness is common",
      "Breathing and heart rate may become dangerously slow or irregular",
      "Risk of choking, aspiration, and respiratory failure is significant",
      "Hypothermia and other life-threatening conditions may develop",
      "You should not be alone—continuous monitoring is essential",
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
      "Consciousness is typically absent; unresponsiveness is common",
      "Life-sustaining reflexes (breathing, gag reflex) may be dangerously impaired",
      "This represents a serious medical emergency requiring immediate attention",
    ],
    effectsDetail: [
      "Respiratory depression and irregular breathing are significant risks",
      "Gag reflex suppression increases risk of choking and aspiration",
      "Temperature regulation failure may lead to hypothermia",
      "Seizures and other neurological complications may occur",
      "Continuous medical monitoring is essential",
      "This level warrants immediate emergency medical evaluation",
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
      "Complete loss of consciousness; coma is likely",
      "Life-sustaining functions (breathing, heart rate) are critically threatened",
      "This is a life-threatening medical emergency—call 911 immediately",
    ],
    effectsDetail: [
      "Respiratory arrest (stopped breathing) may occur at any time",
      "Heart rate may become critically slow, irregular, or stop",
      "Coma and severe brain depression are significant risks",
      "Death from alcohol poisoning is a real possibility",
      "Call 911 immediately—do not wait or attempt to treat this at home",
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
