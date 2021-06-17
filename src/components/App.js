import React from 'react'
import Kamar from 'kamar-js'

import Nav from './navigation/Nav.js'
import NavItem from './navigation/NavItem.js'
import Timetable from './timetable/Timetable.js'

import '../assets/css/App.css'
import './App.js'

export default function App() {
  const kamar = new Kamar({ portal: 'portal.mahurangi.school.nz/kamar' });

  const myItems = [
    { Class: 'L2BUS', Room: 'R1', Teacher: 'MOC', Time: undefined },
    { Class: 'L2DVC', Room: 'T2', Teacher: 'STE', Time: undefined },
    {
      Class: undefined,
      Room: undefined,
      Teacher: undefined,
      Time: undefined
    },
    { Class: 'L2MA1', Room: 'B1', Teacher: 'NEV', Time: undefined },
    { Class: 'L2EN1', Room: 'E5', Teacher: 'CHI', Time: undefined },
    {
      Class: undefined,
      Room: undefined,
      Teacher: undefined,
      Time: undefined
    },
    {
      Class: 'Whanau',
      Room: 'B8',
      Teacher: 'SEA/JEN',
      Time: undefined
    },
    { Class: 'L2PHY', Room: 'K7', Teacher: 'MCM', Time: undefined }
  ];

  kamar.logon("jv96", "1249")
    .then(credentials => {
        kamar.getCalendar(credentials)
            .then(calender => kamar.getTimetable(credentials, calender))
            .then(timetable => {
                console.log(timetable[1])
            })
    })
  
  return ( <div className="pt-10">
    <Nav>
        <NavItem href="/featured" isActive>Timetable</NavItem>
        <NavItem href="/popular">Notices</NavItem>
        <NavItem href="/recent">Classwork</NavItem>
      </Nav>
    <Timetable periods={ myItems }/> 
    </div>

  )
}