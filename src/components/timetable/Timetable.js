import React from 'react'

import List from './List.js'
import ListItem from './ListItem.js'

export default function Timetable({ periods }) {
  return (
    <div className="divide-y divide-gray-100">
      <List>
        {periods.map((period) => (
          <ListItem key={period.id} period={period} />
        ))}
      </List>
    </div>
  )
}