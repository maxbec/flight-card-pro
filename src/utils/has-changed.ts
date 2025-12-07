import type { HassEntity } from 'home-assistant-js-websocket';
import { ChangedProps, HomeAssistant } from '../types';

export function hasConfigChanged(element: any, changedProps: ChangedProps): boolean {
  if (changedProps.has('_config')) {
    return true;
  }

  if (!changedProps.has('hass')) {
    return false;
  }

  const oldHass = changedProps.get('hass');
  if (!oldHass) {
    return true;
  }

  if (
    oldHass.connected !== element.hass!.connected ||
    oldHass.themes !== element.hass!.themes ||
    oldHass.locale !== element.hass!.locale ||
    oldHass.localize !== element.hass.localize ||
    oldHass.formatEntityState !== element.hass.formatEntityState ||
    oldHass.formatEntityAttributeName !== element.hass.formatEntityAttributeName ||
    oldHass.formatEntityAttributeValue !== element.hass.formatEntityAttributeValue ||
    oldHass.config.state !== element.hass.config.state
  ) {
    return true;
  }
  return false;
}

function compareEntityState(oldHass: HomeAssistant, newHass: HomeAssistant, entityId: string) {
  const oldState = oldHass.states[entityId] as HassEntity | undefined;
  const newState = newHass.states[entityId] as HassEntity | undefined;

  return oldState !== newState;
}

function compareEntityDisplayEntry(
  oldHass: HomeAssistant,
  newHass: HomeAssistant,
  entityId: string
) {
  const oldEntry = oldHass.entities[entityId];
  const newEntry = newHass.entities[entityId];

  return oldEntry?.display_precision !== newEntry?.display_precision;
}

// Check if config or Entity changed
export function hasConfigOrEntityChanged(element: any, changedProps: ChangedProps): boolean {
  if (hasConfigChanged(element, changedProps)) {
    return true;
  }

  if (!changedProps.has('hass')) {
    return false;
  }

  const oldHass = changedProps.get('hass')!;
  const newHass = element.hass;

  return (
    compareEntityState(oldHass, newHass, element._config!.entity) ||
    compareEntityDisplayEntry(oldHass, newHass, element._config!.entity)
  );
}
