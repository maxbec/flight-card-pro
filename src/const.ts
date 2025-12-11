export const CARD_VERSION = '0.0.0';

export const CARD_NAME = 'flightradar-flight-card';
export const CARD_DESCRIPTION =
  'A custom Home Assistant card for displaying Flightradar flight information';

export type CardConfig = {
  entity: string;
};

export const DEFAULT_CONFIG: Partial<CardConfig> = {};
