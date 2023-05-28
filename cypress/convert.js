

// // const report = require('multiple-cucumber-html-reporter');

// // report.generate({
// // 	jsonDir: './path-to-your-json-output/',
// // 	reportPath: './path-where-the-report-needs-to-be/',
// // 	metadata:{
// //         browser: {
// //             name: 'chrome',
// //             version: '60'
// //         },
// //         device: 'Local test machine',
// //         platform: {
// //             name: 'ubuntu',
// //             version: '16.04'
// //         }
// //     },
// //     customData: {
// //         title: 'Run info',
// //         data: [
// //             {label: 'Project', value: 'Custom project'},
// //             {label: 'Release', value: '1.2.3'},
// //             {label: 'Cycle', value: 'B11221.34321'},
// //             {label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST'},
// //             {label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST'}
// //         ]
// //     }
// // });
// const reporter = require('cucumber-html-reporter');

// const options = {
//   theme: 'hierarchy',
//   jsonDir: 'cypress/cucumber-json',
//   output: 'reports/html_simple/cucumber_report.html',
//   reportSuiteAsScenarios: true,
//   scenarioTimestamp: true,
//   launchReport: true,
//   ignoreBadJsonFile: true,
//   scenarioTimestamp: true,
//   metadata: {
//     "App Version": "1.0.0",
//     "Test Environment": "STAGING",
//     "Browser": "Chrome  54.0.2840.98",
//     "Platform": "Windows 10",
//     "Parallel": "Scenarios",
//     "Executed": "Remote"
//   }
// };

// reporter.generate(options);
