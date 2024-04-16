function getClassNamePrefix(className: string): string {
  const attr = className.split('-')

  if (attr.length === 1) {
    return className
  }

  return attr.slice(0, attr.length - 1).join('-')
}

export function classNames(classes: (string | undefined)[]): string {
  const classStr = classes
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .sort()
    .reduce((arr, curr) => {
      // console.log('arr', arr)
      const currPrefix = getClassNamePrefix(curr)

      if (!arr.length) {
        return [curr]
      }
      const lastArrPrefix = getClassNamePrefix(arr[arr.length - 1])

      if (currPrefix === lastArrPrefix) {
        return [...arr.slice(0, arr.length - 1), curr]
      }

      return [...arr, curr]
    }, [])
    .join(' ')

  // console.log('classStr', classStr)
  return classStr
}
