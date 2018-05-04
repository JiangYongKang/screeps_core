module.exports.loop = function () {

    // 如果当前的 creeps 数量小于 10 个，并且核心中剩余的能量大于 300 则自动生成一个新的 creeps
    if (Object.values(Game.creeps).filter(creep => creep.memory.role === 'WORKER').length < 5 && Game.spawns['spawn'].energy >= 300) {
        let creepName = Math.random().toString(16).substring(2, 6).toUpperCase()
        Game.spawns['spawn'].spawnCreep([WORK, CARRY, MOVE], creepName, {
            memory: {
                role: 'WORKER',
                empty: true,
                full: false,
            }
        })
    }

    // 如果当前的 creeps 数量小于 10 个，并且核心中剩余的能量大于 300 则自动生成一个新的 creeps
    if (Object.values(Game.creeps).filter(creep => creep.memory.role === 'WORKER').length < 5 && Game.spawns['spawn'].energy >= 300) {
        let creepName = Math.random().toString(16).substring(2, 6).toUpperCase()
        Game.spawns['spawn'].spawnCreep([WORK, CARRY, MOVE], creepName, {
            memory: {
                role: 'UPGRADER',
                empty: true,
                full: false,
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
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE)
                creep.moveTo(sources[0]);
        } else {
            // 如果满载的情况，则去采集矿物并将矿物卸载到核心中
            if (creep.transfer(Game.spawns['spawn'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['spawn'])
            }
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: structure => structure.structureType === STRUCTURE_WALL && structure.hits > 0 && structure.hits < 10000
            })
            targets.forEach(target => {
                creep.moveTo(target)
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
                creep.moveTo(sources[0])
            }
        } else {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }
        }

    })

}
