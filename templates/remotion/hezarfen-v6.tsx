import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate, Easing} from 'remotion';

export const FPS = 30;
export const DURATION_FRAMES = 1200;
export const WIDTH = 1080;
export const HEIGHT = 1920;

const clamp = (n:number) => Math.max(0, Math.min(1, n));
const u = (f:number,a:number,b:number) => clamp((f-a)/(b-a));
const ease = (x:number) => Easing.inOut(Easing.cubic)(clamp(x));
const asset = (name:string) => staticFile(`v6/${name}`);

const bgMap = {
  workshop: asset('roof-workshop.png'),
  edge: asset('roof-edge.png'),
  aerial: asset('istanbul-aerial.png'),
  square: asset('uskudar-square.png'),
};

type Pose = 'neutral'|'step'|'launch';

function Background({kind, zoom=1, panX=0, panY=0, warm=false}:{kind:keyof typeof bgMap;zoom?:number;panX?:number;panY?:number;warm?:boolean}) {
  const f = useCurrentFrame();
  const drift = Math.sin(f*.018)*1.5;
  return <AbsoluteFill style={{overflow:'hidden',background:'#d8c5ad'}}>
    <Img src={bgMap[kind]} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',transform:`translate(${panX+drift}px,${panY}px) scale(${zoom})`,transformOrigin:'50% 50%'}} />
    {warm && <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(255,190,110,.10),rgba(90,45,55,.14))',mixBlendMode:'multiply'}}/>}
  </AbsoluteFill>;
}

function WindRibbon({x=540,y=850,flip=false,opacity=1}:{x?:number;y?:number;flip?:boolean;opacity?:number}) {
  const f=useCurrentFrame();
  const dash=30+(f%18);
  return <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,pointerEvents:'none',opacity}}>
    <path d={flip?`M${x+230} ${y} Q${x} ${y-120} ${x-230} ${y-20}`:`M${x-230} ${y} Q${x} ${y-120} ${x+230} ${y-20}`} fill="none" stroke="#d95548" strokeWidth="12" strokeDasharray={`${dash} 20`} strokeLinecap="round" />
  </svg>;
}

function Dust({x,y,amount=1}:{x:number;y:number;amount?:number}) {
  const f=useCurrentFrame();
  return <g opacity={.25*amount} fill="#e9c58f">{[0,1,2,3,4].map(i=>{const dx=Math.sin(f*.08+i*1.7)*35+i*18; const dy=((f*1.8+i*23)%130); return <circle key={i} cx={x+dx} cy={y-dy} r={5+i%3*3}/>;})}</g>;
}

function Puppet({pose='neutral',x=540,y=1120,scale=1,rot=0,flip=false,opacity=1}:{pose?:Pose;x?:number;y?:number;scale?:number;rot?:number;flip?:boolean;opacity?:number}) {
  const f=useCurrentFrame();
  const bob=pose==='launch'?Math.sin(f*.16)*8:Math.sin(f*.12)*2;
  const file=pose==='neutral'?'hezarfen-neutral.png':pose==='step'?'hezarfen-step.png':'hezarfen-launch.png';
  const sway=pose==='step'?Math.sin(f*.22)*2:pose==='launch'?Math.sin(f*.13)*3:0;
  return <Img src={asset(file)} style={{position:'absolute',left:x,top:y+bob, width:520, height:'auto',transformOrigin:'50% 80%',transform:`translate(-50%,-50%) translateX(${sway}px) rotate(${rot}deg) scaleX(${flip?-1:1}) scale(${scale})`,opacity,filter:'drop-shadow(0 16px 7px rgba(42,28,26,.30))'}}/>;
}

function FrameFlash({at,children}:{at:number;children?:React.ReactNode}) {
  const f=useCurrentFrame(); const p=u(f,at,at+8);
  return <AbsoluteFill style={{background:`rgba(255,245,208,${(1-p)*.18})`,pointerEvents:'none'}}>{children}</AbsoluteFill>;
}

function Beat({index}:{index:number}) {
  const f=useCurrentFrame();
  // Each beat is a real moving setup: camera drift, puppet pose interpolation,
  // prop/character scale changes, and motivated action cuts.
  if(index===0) return <><Background kind="workshop" zoom={1.10} panX={interpolate(f,[0,90],[35,-25])} panY={interpolate(f,[0,90],[30,5])}/><Puppet x={560} y={1140} scale={interpolate(f,[0,90],[.72,.84],{extrapolateRight:'clamp'})} rot={Math.sin(f*.3)*1.5}/><WindRibbon x={600} y={840} opacity={.8}/><FrameFlash at={0}><Dust x={620} y={1390} amount={.6}/></FrameFlash></>;
  if(index===1) return <><Background kind="workshop" zoom={1.35} panX={-80} panY={-110}/><Puppet pose="neutral" x={640} y={1000} scale={1.04} rot={interpolate(f,[0,60],[-2,2])}/><WindRibbon x={650} y={740} flip opacity={.8}/></>;
  if(index===2) return <><Background kind="workshop" zoom={1.04} panX={interpolate(f,[0,66],[50,-30])} panY={0}/><Puppet pose="step" x={interpolate(f,[0,66],[360,620])} y={1220} scale={.74} rot={interpolate(f,[0,66],[-4,4])}/><WindRibbon x={440} y={900} flip opacity={.65}/><FrameFlash at={0}/></>;
  if(index===3) return <><Background kind="workshop" zoom={1.55} panX={-140} panY={-240}/><Puppet pose="neutral" x={650} y={980} scale={1.12} rot={Math.sin(f*.15)*1.3}/><svg width="1080" height="1920" style={{position:'absolute',inset:0}}><circle cx="780" cy="930" r={80+Math.sin(f*.2)*10} fill="none" stroke="#d95548" strokeWidth="9" strokeDasharray="22 18"/><path d="M780 850v160M700 930h160" stroke="#5f3e3a" strokeWidth="7"/></svg></>;
  if(index===4) return <><Background kind="workshop" zoom={1.03} panX={interpolate(f,[0,66],[-20,25])} panY={0}/><Puppet pose="neutral" x={interpolate(f,[0,66],[340,570])} y={1160} scale={.78} rot={interpolate(f,[0,66],[2,-2])}/><WindRibbon x={520} y={820} opacity={.7}/></>;
  if(index===5) return <><Background kind="workshop" zoom={1.18} panX={-120} panY={-90}/><Puppet pose="neutral" x={600} y={1080} scale={.92} rot={Math.sin(f*.16)*2}/><svg width="1080" height="1920" style={{position:'absolute',inset:0}}><path d="M250 720 Q540 540 850 760" fill="none" stroke="#d95548" strokeWidth="13" strokeDasharray="28 22"/><path d="M250 800 Q540 940 850 800" fill="none" stroke="#6b4b42" strokeWidth="9"/></svg></>;
  if(index===6) return <><Background kind="edge" zoom={1.08} panX={interpolate(f,[0,66],[20,-80])} panY={20}/><Puppet pose="step" x={interpolate(f,[0,66],[390,620])} y={1230} scale={.78} rot={interpolate(f,[0,66],[-5,2])}/><WindRibbon x={540} y={950} opacity={.9}/><FrameFlash at={54}/></>;
  if(index===7) return <><Background kind="edge" zoom={1.03} panX={interpolate(f,[0,84],[70,-80])} panY={0}/><Puppet pose="launch" x={interpolate(f,[0,84],[500,860])} y={interpolate(f,[0,84],[1240,840])} scale={interpolate(f,[0,84],[.54,.58])} rot={interpolate(f,[0,84],[2,-5])}/><WindRibbon x={720} y={740} opacity={.85}/></>;
  if(index===8) return <><Background kind="aerial" zoom={interpolate(f,[0,114],[1.08,1.22])} panX={interpolate(f,[0,114],[35,-90])} panY={interpolate(f,[0,114],[50,-40])} warm/><Puppet pose="launch" x={interpolate(f,[0,114],[380,760])} y={interpolate(f,[0,114],[760,620])} scale={interpolate(f,[0,114],[.5,.68])} rot={interpolate(f,[0,114],[5,-3])}/><WindRibbon x={550} y={680} opacity={.75}/></>;
  if(index===9) return <><Background kind="aerial" zoom={1.25} panX={interpolate(f,[0,114],[80,-80])} panY={-40} warm/><Puppet pose="launch" x={interpolate(f,[0,114],[350,820])} y={interpolate(f,[0,114],[700,520])} scale={.64} rot={interpolate(f,[0,114],[2,-4])}/><WindRibbon x={640} y={590} opacity={.7}/></>;
  return <><Background kind="square" zoom={interpolate(f,[0,120],[1.06,1.14])} panX={interpolate(f,[0,120],[20,-30])} panY={interpolate(f,[0,120],[20,-20])} warm/><Puppet pose="launch" x={interpolate(f,[0,120],[720,540])} y={interpolate(f,[0,120],[720,1260])} scale={interpolate(f,[0,120],[.48,.58])} rot={interpolate(f,[0,120],[-4,0])}/><Dust x={540} y={1400} amount={.9}/></>;
}

export const HezarfenV6: React.FC = () => {
  const beats = [0,90,150,240,330,420,480,600,690,780,900,1080];
  const ends = [90,150,240,330,420,480,600,690,780,900,1080,1200];
  return <AbsoluteFill style={{background:'#d8c5ad'}}>{beats.map((start,i)=><Sequence key={i} from={start} durationInFrames={ends[i]-start}><Beat index={i}/></Sequence>)}</AbsoluteFill>;
};
