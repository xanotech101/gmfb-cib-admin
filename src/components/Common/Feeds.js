import { CheckIcon} from '@heroicons/react/20/solid'
const timeline = [
  {
    id: 1,
    content: 'Adewale',
    target: 'Account Officer',
    href: '#',
    datetime: '2020-09-20',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 2,
    content: 'Shittu Ashola',
    target: 'Manager',
    href: '#',
    datetime: '2020-09-22',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 3,
    content: 'Femi Lola',
    target: 'Bank Manager',
    href: '#',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-gray-500',
  },
  {
    id: 4,
    content: 'Signatory',
    target: 'Bethany Blake',
    href: '#',
    datetime: '2020-09-30',
    icon:CheckIcon,
    iconBackground: 'bg-gray-500',
  },
 
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Feeds=()=> {
  return (
    <div className="flow-root mt-4 ml-3">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.content}{' '}
                      <a href={event.href} className="font-medium text-gray-900">
                        {event.target}
                      </a>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
