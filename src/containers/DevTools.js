import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
// import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = __DEVTOOLS__ ? createDevTools(
  <LogMonitor theme="tomorrow"/>
) : () => { return (<div></div>); };

/*
const DevTools = __DEVTOOLS__ ? createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'>
    <LogMonitor theme="tomorrow"/>
  </DockMonitor>
) : () => { return (<div></div>); };
*/
export default DevTools;
