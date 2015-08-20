/// <reference path="../typings/tsd.d.ts" />

import chai = require('chai');
import THREE = require('three');

import com from '../common/Common';
import World from '../worker/World';

const expect = chai.expect;

describe('World', () => {
  it('can create an empty world', () => {
    const worldInfo = new com.WorldInfo({
      worldDimensionsInPartitions: new THREE.Vector3(4, 1, 4),
      partitionDimensionsInBlocks: new THREE.Vector3(256, 32, 256),
      partitionBoundaries: null
    });

    const world = new World(worldInfo);

    console.time('init');
    world.init();
    console.timeEnd('init');

    // console.time('getPartitionByIndex');
    //const partition = world.getPartitionByIndex(0);
    // console.timeEnd('getPartitionByIndex');

    world.getPartitionByIndex(0);
    world.getPartitionByIndex(1);
    world.getPartitionByIndex(2);
    world.getPartitionByIndex(4);

    world.getPartitionByIndex(5);

    world.getPartitionByIndex(6);
    world.getPartitionByIndex(8);
    world.getPartitionByIndex(9);
    world.getPartitionByIndex(10);

    console.time('getVisibleBlocks');
    const result = world.getVisibleBlocks(5);
    console.timeEnd('getVisibleBlocks');

    expect(world.partitions.length).to.be.equal(16);

    // console.log(partition.occupied);
  });

  it('can convert from pos to index quickly', () => {
    const worldInfo = new com.WorldInfo({
      worldDimensionsInPartitions: new THREE.Vector3(128, 1, 128),
      partitionDimensionsInBlocks: new THREE.Vector3(256, 256, 256),
      partitionBoundaries: null
    });

    let i = 0;
    let errors = 0;

    for (let z = 0; z < worldInfo.partitionDimensionsInBlocks.z; z += 1) {
      for (let y = 0; y < worldInfo.partitionDimensionsInBlocks.y; y += 1) {
        for (let x = 0; x < worldInfo.partitionDimensionsInBlocks.x; x += 1, i += 1) {
          let index = worldInfo.rindex2(x, y, z);

          if (index !== i) errors += 1;
        }
      }
    }

    console.log('errors', errors);
  });

  it('can rposw', () => {
    const worldInfo = new com.WorldInfo({
      worldDimensionsInPartitions: new THREE.Vector3(128, 1, 128),
      partitionDimensionsInBlocks: new THREE.Vector3(128, 128, 128),
      partitionBoundaries: null
    });

    let errors = 0;

    for (let z = 0; z < worldInfo.partitionDimensionsInBlocks.z; z += 1) {
      for (let y = 0; y < worldInfo.partitionDimensionsInBlocks.y; y += 1) {
        for (let x = 0; x < worldInfo.partitionDimensionsInBlocks.x; x += 1) {
          const ox = 1024, oz = 1024;

          const rpos = worldInfo.rposw2(ox + x, 0, oz + z);

          if (rpos.x !== x) errors += 1;
          if (rpos.z !== z) errors += 1;
        }
      }
    }

    console.log('errors', errors);
  });
});