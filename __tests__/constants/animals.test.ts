import { ANIMALS, STAGE_THRESHOLDS, getStageForPoints, AnimalType, AnimalStage } from '../../src/constants/animals';

describe('animals', () => {
  it('defines 5 animal species', () => {
    expect(Object.keys(ANIMALS)).toHaveLength(5);
  });

  it('each animal has emoji for all 4 stages', () => {
    const stages: AnimalStage[] = ['egg', 'baby', 'junior', 'adult'];
    for (const animal of Object.values(ANIMALS)) {
      for (const stage of stages) {
        expect(animal.emojis[stage]).toBeDefined();
      }
    }
  });

  it('getStageForPoints returns correct stage', () => {
    expect(getStageForPoints(0)).toBe('egg');
    expect(getStageForPoints(100)).toBe('egg');
    expect(getStageForPoints(200)).toBe('baby');
    expect(getStageForPoints(999)).toBe('baby');
    expect(getStageForPoints(1000)).toBe('junior');
    expect(getStageForPoints(2999)).toBe('junior');
    expect(getStageForPoints(3000)).toBe('adult');
    expect(getStageForPoints(10000)).toBe('adult');
  });
});
