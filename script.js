const _0x5ee598=_0x32d2;(function(_0x3582a0,_0x50e417){const _0x346781=_0x32d2,_0x22e429=_0x3582a0();while(!![]){try{const _0x357771=parseInt(_0x346781(0x9b))/0x1+-parseInt(_0x346781(0xb6))/0x2*(parseInt(_0x346781(0xad))/0x3)+parseInt(_0x346781(0x9f))/0x4+parseInt(_0x346781(0xab))/0x5+-parseInt(_0x346781(0x86))/0x6+-parseInt(_0x346781(0xb3))/0x7+parseInt(_0x346781(0x87))/0x8;if(_0x357771===_0x50e417)break;else _0x22e429['push'](_0x22e429['shift']());}catch(_0x4c92f8){_0x22e429['push'](_0x22e429['shift']());}}}(_0x42ac,0x26bde));function _0x32d2(_0x48727d,_0x43ef21){const _0x42ac26=_0x42ac();return _0x32d2=function(_0x32d2d2,_0x4c6aba){_0x32d2d2=_0x32d2d2-0x84;let _0x3e8361=_0x42ac26[_0x32d2d2];return _0x3e8361;},_0x32d2(_0x48727d,_0x43ef21);}const vertexShaderSource='\x0aattribute\x20vec2\x20position;\x0avoid\x20main()\x20{\x0a\x20\x20\x20\x20gl_Position\x20=\x20vec4(position,\x200.0,\x201.0);\x0a}\x0a',fragmentShaderSource=_0x5ee598(0x88);function _0x42ac(){const _0x4bd12c=['deleteShader','getProgramParameter','952590rLmKFg','uniform2f','3vxoBVy','COMPILE_STATUS','canvas','disable','now','getShaderInfoLog','442498BNFykm','compileShader','position','367544QkaRUB','useProgram','DEPTH_TEST','1766964PYLMhx','1561072wNefeI','\x0a//From\x20shadertoy.com\x20\x0a//Created\x20by\x20nimitz\x20in\x202019-05-27\x0a//Imported\x20to\x20glslsandbox.com\x20by\x20Shad0wolf0\x0a\x0a#extension\x20GL_OES_standard_derivatives\x20:\x20enable\x0a\x0aprecision\x20highp\x20float;\x0a\x0auniform\x20float\x20time;\x0auniform\x20vec2\x20mouse;\x0a\x0auniform\x20vec2\x20resolution;\x0a\x0afloat\x20iTime\x20=\x20time;\x0avec2\x20iResolution\x20=\x20resolution;\x0avec2\x20iMouse\x20=\x20mouse;\x0a\x0a//\x20Protean\x20clouds\x20by\x20nimitz\x20(twitter:\x20@stormoid)\x0a//\x20https://www.shadertoy.com/view/3l23Rh\x0a//\x20License\x20Creative\x20Commons\x20Attribution-NonCommercial-ShareAlike\x203.0\x20Unported\x20License\x0a//\x20Contact\x20the\x20author\x20for\x20other\x20licensing\x20options\x0a\x0a/*\x0a\x09Technical\x20details:\x0a\x0a\x09The\x20main\x20volume\x20noise\x20is\x20generated\x20from\x20a\x20deformed\x20periodic\x20grid,\x20which\x20can\x20produce\x0a\x09a\x20large\x20range\x20of\x20noise-like\x20patterns\x20at\x20very\x20cheap\x20evalutation\x20cost.\x20Allowing\x20for\x20multiple\x0a\x09fetches\x20of\x20volume\x20gradient\x20computation\x20for\x20improved\x20lighting.\x0a\x0a\x09To\x20further\x20accelerate\x20marching,\x20since\x20the\x20volume\x20is\x20smooth,\x20more\x20than\x20half\x20the\x20the\x20density\x0a\x09information\x20isn\x27t\x20used\x20to\x20rendering\x20or\x20shading\x20but\x20only\x20as\x20an\x20underlying\x20volume\x09distance\x20to\x20\x0a\x09determine\x20dynamic\x20step\x20size,\x20by\x20carefully\x20selecting\x20an\x20equation\x09(polynomial\x20for\x20speed)\x20to\x20\x0a\x09step\x20as\x20a\x20function\x20of\x20overall\x20density\x20(not\x20necessarily\x20rendered)\x20the\x20visual\x20results\x20can\x20be\x20\x0a\x09the\x09same\x20as\x20a\x20naive\x20implementation\x20with\x20~40%\x20increase\x20in\x20rendering\x20performance.\x0a\x0a\x09Since\x20the\x20dynamic\x20marching\x20step\x20size\x20is\x20even\x20less\x20uniform\x20due\x20to\x20steps\x20not\x20being\x20rendered\x20at\x20all\x0a\x09the\x20fog\x20is\x20evaluated\x20as\x20the\x20difference\x20of\x20the\x20fog\x20integral\x20at\x20each\x20rendered\x20step.\x0a\x0a*/\x0a\x0amat2\x20rot(in\x20float\x20a){float\x20c\x20=\x20cos(a),\x20s\x20=\x20sin(a);return\x20mat2(c,s,-s,c);}\x0aconst\x20mat3\x20m3\x20=\x20mat3(0.33338,\x200.56034,\x20-0.71817,\x20-0.87887,\x200.32651,\x20-0.15323,\x200.15162,\x200.69596,\x200.61339)*1.93;\x0afloat\x20mag2(vec2\x20p){return\x20dot(p,p);}\x0afloat\x20linstep(in\x20float\x20mn,\x20in\x20float\x20mx,\x20in\x20float\x20x){\x20return\x20clamp((x\x20-\x20mn)/(mx\x20-\x20mn),\x200.,\x201.);\x20}\x0afloat\x20prm1\x20=\x200.;\x0avec2\x20bsMo\x20=\x20vec2(0);\x0a\x0avec2\x20disp(float\x20t){\x20return\x20vec2(sin(t*0.22)*1.,\x20cos(t*0.175)*1.)*2.;\x20}\x0a\x0avec2\x20map(vec3\x20p)\x0a{\x0a\x20\x20\x20\x20vec3\x20p2\x20=\x20p;\x0a\x20\x20\x20\x20p2.xy\x20-=\x20disp(p.z).xy;\x0a\x20\x20\x20\x20p.xy\x20*=\x20rot(sin(p.z+iTime)*(0.1\x20+\x20prm1*0.05)\x20+\x20iTime*0.09);\x0a\x20\x20\x20\x20float\x20cl\x20=\x20mag2(p2.xy);\x0a\x20\x20\x20\x20float\x20d\x20=\x200.;\x0a\x20\x20\x20\x20p\x20*=\x20.61;\x0a\x20\x20\x20\x20float\x20z\x20=\x201.;\x0a\x20\x20\x20\x20float\x20trk\x20=\x201.;\x0a\x20\x20\x20\x20float\x20dspAmp\x20=\x200.1\x20+\x20prm1*0.2;\x0a\x20\x20\x20\x20for(int\x20i\x20=\x200;\x20i\x20<\x205;\x20i++)\x0a\x20\x20\x20\x20{\x0a\x09\x09p\x20+=\x20sin(p.zxy*0.75*trk\x20+\x20iTime*trk*.8)*dspAmp;\x0a\x20\x20\x20\x20\x20\x20\x20\x20d\x20-=\x20abs(dot(cos(p),\x20sin(p.yzx))*z);\x0a\x20\x20\x20\x20\x20\x20\x20\x20z\x20*=\x200.57;\x0a\x20\x20\x20\x20\x20\x20\x20\x20trk\x20*=\x201.4;\x0a\x20\x20\x20\x20\x20\x20\x20\x20p\x20=\x20p*m3;\x0a\x20\x20\x20\x20}\x0a\x20\x20\x20\x20d\x20=\x20abs(d\x20+\x20prm1*3.)+\x20prm1*.3\x20-\x202.5\x20+\x20bsMo.y;\x0a\x20\x20\x20\x20return\x20vec2(d\x20+\x20cl*.2\x20+\x200.25,\x20cl);\x0a}\x0a\x0avec4\x20render(\x20in\x20vec3\x20ro,\x20in\x20vec3\x20rd,\x20float\x20time\x20)\x0a{\x0a\x09vec4\x20rez\x20=\x20vec4(0);\x0a\x20\x20\x20\x20const\x20float\x20ldst\x20=\x208.;\x0a\x09vec3\x20lpos\x20=\x20vec3(disp(time\x20+\x20ldst)*0.5,\x20time\x20+\x20ldst);\x0a\x09float\x20t\x20=\x201.5;\x0a\x09float\x20fogT\x20=\x200.;\x0a\x09for(int\x20i=0;\x20i<130;\x20i++)\x0a\x09{\x0a\x09\x09if(rez.a\x20>\x200.99)break;\x0a\x0a\x09\x09vec3\x20pos\x20=\x20ro\x20+\x20t*rd;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20mpv\x20=\x20map(pos);\x0a\x09\x09float\x20den\x20=\x20clamp(mpv.x-0.3,0.,1.)*1.12;\x0a\x09\x09float\x20dn\x20=\x20clamp((mpv.x\x20+\x202.),0.,3.);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x09\x09vec4\x20col\x20=\x20vec4(0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(mpv.x\x20>\x200.6)\x0a\x20\x20\x20\x20\x20\x20\x20\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20col\x20=\x20vec4(sin(vec3(5.,0.4,0.2)\x20+\x20mpv.y*0.1\x20+sin(pos.z*0.4)*0.5\x20+\x201.8)*0.5\x20+\x200.5,0.08);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20col\x20*=\x20den*den*den;\x0a\x09\x09\x09col.rgb\x20*=\x20linstep(4.,-2.5,\x20mpv.x)*2.3;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20dif\x20=\x20\x20clamp((den\x20-\x20map(pos+.8).x)/9.,\x200.001,\x201.\x20);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20dif\x20+=\x20clamp((den\x20-\x20map(pos+.35).x)/2.5,\x200.001,\x201.\x20);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20col.xyz\x20*=\x20den*(vec3(0.005,.045,.075)\x20+\x201.5*vec3(0.033,0.07,0.03)*dif);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x09\x09\x0a\x09\x09float\x20fogC\x20=\x20exp(t*0.2\x20-\x202.2);\x0a\x09\x09col.rgba\x20+=\x20vec4(0.06,0.11,0.11,\x200.1)*clamp(fogC-fogT,\x200.,\x201.);\x0a\x09\x09fogT\x20=\x20fogC;\x0a\x09\x09rez\x20=\x20rez\x20+\x20col*(1.\x20-\x20rez.a);\x0a\x09\x09t\x20+=\x20clamp(0.5\x20-\x20dn*dn*.05,\x200.09,\x200.3);\x0a\x09}\x0a\x09return\x20clamp(rez,\x200.0,\x201.0);\x0a}\x0a\x0afloat\x20getsat(vec3\x20c)\x0a{\x0a\x20\x20\x20\x20float\x20mi\x20=\x20min(min(c.x,\x20c.y),\x20c.z);\x0a\x20\x20\x20\x20float\x20ma\x20=\x20max(max(c.x,\x20c.y),\x20c.z);\x0a\x20\x20\x20\x20return\x20(ma\x20-\x20mi)/(ma+\x201e-7);\x0a}\x0a\x0a//from\x20my\x20\x22Will\x20it\x20blend\x22\x20shader\x20(https://www.shadertoy.com/view/lsdGzN)\x0avec3\x20iLerp(in\x20vec3\x20a,\x20in\x20vec3\x20b,\x20in\x20float\x20x)\x0a{\x0a\x20\x20\x20\x20vec3\x20ic\x20=\x20mix(a,\x20b,\x20x)\x20+\x20vec3(1e-6,0.,0.);\x0a\x20\x20\x20\x20float\x20sd\x20=\x20abs(getsat(ic)\x20-\x20mix(getsat(a),\x20getsat(b),\x20x));\x0a\x20\x20\x20\x20vec3\x20dir\x20=\x20normalize(vec3(2.*ic.x\x20-\x20ic.y\x20-\x20ic.z,\x202.*ic.y\x20-\x20ic.x\x20-\x20ic.z,\x202.*ic.z\x20-\x20ic.y\x20-\x20ic.x));\x0a\x20\x20\x20\x20float\x20lgt\x20=\x20dot(vec3(1.0),\x20ic);\x0a\x20\x20\x20\x20float\x20ff\x20=\x20dot(dir,\x20normalize(ic));\x0a\x20\x20\x20\x20ic\x20+=\x201.5*dir*sd*ff*lgt;\x0a\x20\x20\x20\x20return\x20clamp(ic,0.,1.);\x0a}\x0a\x0avoid\x20mainImage(\x20out\x20vec4\x20fragColor,\x20in\x20vec2\x20fragCoord\x20)\x0a{\x09\x0a\x09vec2\x20q\x20=\x20fragCoord.xy/iResolution.xy;\x0a\x20\x20\x20\x20vec2\x20p\x20=\x20(gl_FragCoord.xy\x20-\x200.5*iResolution.xy)/iResolution.y;\x0a\x20\x20\x20\x20bsMo\x20=\x20(iMouse.xy\x20-\x200.5*iResolution.xy)/iResolution.y;\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20float\x20time\x20=\x20iTime*3.;\x0a\x20\x20\x20\x20vec3\x20ro\x20=\x20vec3(0,0,time);\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20ro\x20+=\x20vec3(sin(iTime)*0.5,sin(iTime*1.)*0.,0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20float\x20dspAmp\x20=\x20.85;\x0a\x20\x20\x20\x20ro.xy\x20+=\x20disp(ro.z)*dspAmp;\x0a\x20\x20\x20\x20float\x20tgtDst\x20=\x203.5;\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20vec3\x20target\x20=\x20normalize(ro\x20-\x20vec3(disp(time\x20+\x20tgtDst)*dspAmp,\x20time\x20+\x20tgtDst));\x0a\x20\x20\x20\x20ro.x\x20-=\x20bsMo.x*2.;\x0a\x20\x20\x20\x20vec3\x20rightdir\x20=\x20normalize(cross(target,\x20vec3(0,1,0)));\x0a\x20\x20\x20\x20vec3\x20updir\x20=\x20normalize(cross(rightdir,\x20target));\x0a\x20\x20\x20\x20rightdir\x20=\x20normalize(cross(updir,\x20target));\x0a\x09vec3\x20rd=normalize((p.x*rightdir\x20+\x20p.y*updir)*1.\x20-\x20target);\x0a\x20\x20\x20\x20rd.xy\x20*=\x20rot(-disp(time\x20+\x203.5).x*0.2\x20+\x20bsMo.x);\x0a\x20\x20\x20\x20prm1\x20=\x20smoothstep(-0.4,\x200.4,sin(iTime*0.3));\x0a\x09vec4\x20scn\x20=\x20render(ro,\x20rd,\x20time);\x0a\x09\x09\x0a\x20\x20\x20\x20vec3\x20col\x20=\x20scn.rgb;\x0a\x20\x20\x20\x20col\x20=\x20iLerp(col.bgr,\x20col.rgb,\x20clamp(1.-prm1,0.05,1.));\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20col\x20=\x20pow(col,\x20vec3(.55,0.65,0.6))*vec3(1.,.97,.9);\x0a\x0a\x20\x20\x20\x20col\x20*=\x20pow(\x2016.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),\x200.12)*0.7+0.3;\x20//Vign\x0a\x20\x20\x20\x20\x0a\x09fragColor\x20=\x20vec4(\x20col,\x201.0\x20);\x0a}\x0a\x0avoid\x20main(void)\x0a{\x0a\x20\x20\x20\x20mainImage(gl_FragColor,\x20gl_FragCoord.xy);\x0a\x20\x20\x20\x20gl_FragColor.a\x20=\x201.;\x0a}\x0a','clear','resolution','deleteProgram','vertexAttribPointer','shaderSource','uniform1f','ARRAY_BUFFER','Shader\x20compilation\x20error:\x20','width','innerWidth','VERTEX_SHADER','webgl','viewport','getProgramInfoLog','linkProgram','getUniformLocation','drawArrays','addEventListener','272622CyeVTz','error','innerHeight','getElementById','167568JJIiON','createProgram','Program\x20linking\x20error:\x20','bindBuffer','LINK_STATUS','attachShader','TRIANGLE_STRIP','time','getContext','STATIC_DRAW'];_0x42ac=function(){return _0x4bd12c;};return _0x42ac();}function createShader(_0x23b5b6,_0x33404d,_0x31ad98){const _0x39c245=_0x5ee598,_0xc418a2=_0x23b5b6['createShader'](_0x33404d);_0x23b5b6[_0x39c245(0x8d)](_0xc418a2,_0x31ad98),_0x23b5b6[_0x39c245(0xb4)](_0xc418a2);if(!_0x23b5b6['getShaderParameter'](_0xc418a2,_0x23b5b6[_0x39c245(0xae)]))return console[_0x39c245(0x9c)](_0x39c245(0x90)+_0x23b5b6[_0x39c245(0xb2)](_0xc418a2)),_0x23b5b6[_0x39c245(0xa9)](_0xc418a2),null;return _0xc418a2;}function createProgram(_0x1e5f9a,_0x201da4,_0xaaf0c7){const _0x3113fd=_0x5ee598,_0x3e412a=_0x1e5f9a[_0x3113fd(0xa0)]();_0x1e5f9a[_0x3113fd(0xa4)](_0x3e412a,_0x201da4),_0x1e5f9a[_0x3113fd(0xa4)](_0x3e412a,_0xaaf0c7),_0x1e5f9a[_0x3113fd(0x97)](_0x3e412a);if(!_0x1e5f9a[_0x3113fd(0xaa)](_0x3e412a,_0x1e5f9a[_0x3113fd(0xa3)]))return console['error'](_0x3113fd(0xa1)+_0x1e5f9a[_0x3113fd(0x96)](_0x3e412a)),_0x1e5f9a[_0x3113fd(0x8b)](_0x3e412a),null;return _0x3e412a;}function createFullScreenQuad(_0x53881a){const _0xbf36b5=_0x5ee598,_0x436744=_0x53881a['createBuffer']();_0x53881a[_0xbf36b5(0xa2)](_0x53881a[_0xbf36b5(0x8f)],_0x436744);const _0x57076e=[-0x1,0x1,-0x1,-0x1,0x1,0x1,0x1,-0x1];return _0x53881a['bufferData'](_0x53881a[_0xbf36b5(0x8f)],new Float32Array(_0x57076e),_0x53881a[_0xbf36b5(0xa8)]),_0x436744;}function main(){const _0x4d28f7=_0x5ee598,_0x5e6c7d=document[_0x4d28f7(0x9e)](_0x4d28f7(0xaf)),_0x44b999=_0x5e6c7d[_0x4d28f7(0xa7)](_0x4d28f7(0x94));if(!_0x44b999){console[_0x4d28f7(0x9c)]('WebGL\x20is\x20not\x20supported\x20in\x20your\x20browser.');return;}const _0x2ab1d2=createShader(_0x44b999,_0x44b999[_0x4d28f7(0x93)],vertexShaderSource),_0x460322=createShader(_0x44b999,_0x44b999['FRAGMENT_SHADER'],fragmentShaderSource),_0x3dc068=createProgram(_0x44b999,_0x2ab1d2,_0x460322);_0x44b999[_0x4d28f7(0xa9)](_0x2ab1d2),_0x44b999[_0x4d28f7(0xa9)](_0x460322);if(!_0x3dc068){console[_0x4d28f7(0x9c)]('Failed\x20to\x20create\x20the\x20shader\x20program.');return;}_0x44b999[_0x4d28f7(0x84)](_0x3dc068);const _0x4bc8e2=_0x44b999['getAttribLocation'](_0x3dc068,_0x4d28f7(0xb5)),_0x52bb5f=createFullScreenQuad(_0x44b999);_0x44b999['enableVertexAttribArray'](_0x4bc8e2),_0x44b999[_0x4d28f7(0x8c)](_0x4bc8e2,0x2,_0x44b999['FLOAT'],![],0x0,0x0);const _0x521ec7=_0x44b999[_0x4d28f7(0x98)](_0x3dc068,_0x4d28f7(0x8a)),_0x1a9caa=_0x44b999[_0x4d28f7(0x98)](_0x3dc068,_0x4d28f7(0xa6));function _0x14edb7(){const _0x334311=_0x4d28f7;_0x5e6c7d['width']=window[_0x334311(0x92)],_0x5e6c7d['height']=window[_0x334311(0x9d)],_0x44b999[_0x334311(0x95)](0x0,0x0,_0x5e6c7d[_0x334311(0x91)],_0x5e6c7d['height']);}window[_0x4d28f7(0x9a)]('resize',_0x14edb7),_0x14edb7(),_0x44b999[_0x4d28f7(0xb0)](_0x44b999[_0x4d28f7(0x85)]),_0x44b999[_0x4d28f7(0xb0)](_0x44b999['BLEND']),_0x44b999['clearColor'](0x0,0x0,0x0,0x0);function _0x1f8902(){const _0x4eae14=_0x4d28f7;_0x44b999[_0x4eae14(0xac)](_0x521ec7,_0x5e6c7d[_0x4eae14(0x91)],_0x5e6c7d['height']),_0x44b999[_0x4eae14(0x8e)](_0x1a9caa,performance[_0x4eae14(0xb1)]()/0x3e8),_0x44b999[_0x4eae14(0x89)](_0x44b999['COLOR_BUFFER_BIT']),_0x44b999[_0x4eae14(0x99)](_0x44b999[_0x4eae14(0xa5)],0x0,0x4),requestAnimationFrame(_0x1f8902);}_0x1f8902();}main();