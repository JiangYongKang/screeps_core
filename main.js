module.exports.loop = function () {

    // 如果当前的 creeps 数量小于 10 个，并且核心中剩余的能量大于 300 则自动生成一个新的 creeps
    if (Object.values(Game.creeps).filter(creep => creep.memory.role === 'WORKER').length < 3 && Game.spawns['spawn'].energy >= 300) {
        let creepName = Math.random().toString(16).substring(2, 6).toUpperCase()
        Game.spawns['spawn'].spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {
            memory: {
                role: 'WORKER',
                isEmpty: true
            }
        })
    }

    // 如果当前的 creeps 数量小于 10 个，并且核心中剩余的能量大于 300 则自动生成一个新的 creeps
    if (Object.values(Game.creeps).filter(creep => creep.memory.role === 'UPGRADER').length < 3 && Game.spawns['spawn'].energy >= 300) {
        let creepName = Math.random().toString(16).substring(2, 6).toUpperCase()
        Game.spawns['spawn'].spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {
            memory: {
                role: 'UPGRADER',
                isEmpty: true,
            }
        })
    }

    if (Object.values(Game.creeps).filter(creep => creep.memory.role === 'BUILDER').length < 3 && Game.spawns['spawn'].energy >= 300) {
        let creepName = Math.random().toString(16).substring(2, 6).toUpperCase()
        Game.spawns['spawn'].spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {
            memory: {
                role: 'BUILDER',
                isEmpty: true,
            }
        })
    }

    // 循环所有的 creeps
    Object.values(Game.creeps).filter(creep => creep.memory.role === 'WORKER').forEach(creep => {
        // 如果 creep 身上的能源等于它可以负载的最大能源，则将 full 置为 true
        if (creep.carry.energy === creep.carryCapacity) {
            creep.memory.isEmpty = false
        }
        if (creep.carry.energy === 0) {
            creep.memory.isEmpty = true
        }
        // 如果不是满载的情况，则移动到 spawn 去采矿
        if (creep.memory.isEmpty) {
            let sources = creep.room.find(FIND_SOURCES)
            if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE)
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } })
        } else {
            // 如果满载的情况，则去采集矿物并将矿物卸载到核心中
            if (creep.transfer(Game.spawns['spawn'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['spawn'], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: structure => structure.structureType === STRUCTURE_WALL && structure.hits > 0 && structure.hits < 10000
            })
            targets.forEach(target => {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } })
                creep.repair(target)
            })
        }
    })

    Object.values(Game.creeps).filter(creep => creep.memory.role === 'UPGRADER').forEach(creep => {
        // 如果 creep 身上的能源等于它可以负载的最大能源，则将 full 置为 true
        if (creep.carry.energy === creep.carryCapacity) {
            creep.memory.isEmpty = false
        }
        if (creep.carry.energy === 0) {
            creep.memory.isEmpty = true
        }
        if (creep.memory.isEmpty) {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        } else {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        }
    })

    Object.values(Game.creeps).filter(creep => creep.memory.role === 'BUILDER').forEach(creep => {
        if (creep.carry.energy === creep.carryCapacity) {
            creep.memory.isEmpty = false
        }
        if (creep.carry.energy === 0) {
            creep.memory.isEmpty = true
        }
        if (creep.memory.isEmpty) {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        } else {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES)
            if (targets && targets.length > 0) {
                for (let i = 0; i < targets.length; i++) {
                    if (creep.build(targets[i]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[i], { visualizePathStyle: { stroke: '#ffaa00' } })
                    }
                }
            }
        }
    })

}