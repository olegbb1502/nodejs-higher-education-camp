/**
 * Write a node.JS program with TypeScript that gets from the command line numeric parameter - frequency in seconds. 
 * Program should print every tick (defined by frequency) next system information:
 * - operating system
 * - architecture
 * - current user name
 * - cpu cores models
 * - cpu temperature
 * - graphic controllers vendors and models
 * - total memory, used memory, free memory in GBs
 * - if system has, battery info (charging, percent, remaining time)
 */

 import os from 'os';
 import si from 'systeminformation';
 
 const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours) return `${hours} hours ${minutes} minutes`;
    else return `${minutes} minutes`;
};

 const frequency: number = Number(process.argv[2] || 1) * 1000;
 
 setInterval(async () => {
    const [
        operatingSystem,
        architecture,
        currentUser,
        cpuInfo,
        cpuTemperature,
        graphicsControllers,
        memoryInfo,
        batteryInfo,
    ] = await Promise.all([
        os.platform(),
        os.arch(),
        os.userInfo().username,
        si.cpu(),
        si.cpuTemperature(),
        si.graphics(),
        si.mem(),
        si.battery(),
    ]);

    console.log(`Operating System: ${operatingSystem}`);
    console.log(`Architecture: ${architecture}`);
    console.log(`Current User: ${currentUser}`);
    console.log(`CPU Cores Models: ${cpuInfo.model}`);
    
    // For MacOS install additional package osx-temperature-sensor
    console.log(`CPU Temperature: ${cpuTemperature.main}°C`);
    console.log('Graphics Controllers:');
    graphicsControllers.controllers.forEach((controller) =>
        console.log(`  ${controller.vendor} ${controller.model}`)
    );
    console.log(
        `Total Memory: ${Math.round(memoryInfo.total / (1024 * 1024 * 1024))} GB`
    );
    console.log(
        `Used Memory: ${Math.round(
            (memoryInfo.total - memoryInfo.available) / (1024 * 1024 * 1024)
        )} GB`
    );
    console.log(
        `Free Memory: ${Math.round(memoryInfo.available / (1024 * 1024 * 1024))} GB`
    );
    if (batteryInfo.hasBattery) {
        console.log(`Battery ${batteryInfo.isCharging ? 'is charging' : 'isn`t charging'}`);
        console.log(`Current level is: ${batteryInfo.percent} %`);
        console.log(`Battery remaining: ${toHoursAndMinutes(batteryInfo.timeRemaining)}`);
    }
}, frequency);
