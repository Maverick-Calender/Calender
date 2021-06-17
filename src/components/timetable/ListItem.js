import React from 'react'

export default function ListItem({ period }) {
    return (
      <article className="p-4 flex space-x-4 bg-blue-500">
        <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
          <h2 className="text-lg font-semibold text-black mb-0.5">
            {period.Class}
          </h2>
          <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
            <div>
              <dt className="sr-only">Room</dt>
              <dd>
                <abbr title={`Room: ${period.Room}`}>In: {period.Room} </abbr>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Time</dt>
              <dd>At: {period.Time} </dd>
            </div>
            <div>
              <dt className="sr-only">Teacher</dt>
              <dd>With: {period.Teacher}</dd>
            </div>
          </dl>
        </div>
      </article>
    )
  }
  