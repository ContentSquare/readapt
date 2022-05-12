// prettier-ignore
const enAddMissingWords = (enDict: Record<string, unknown[]>): Record<string, unknown[]> => {
    enDict["where'll"] = [[36, 0, 11, 28, 28, 0, 21, 21], [[0, 7]], [1]]
    enDict["why'll"] = [[36, 0, 6, 0, 21, 21], [[0, 6]], [1]]
    enDict["how'll"] = [[16, 5, 5, 0, 21, 21], [[0, 6]]]
    enDict["when'd"] = [[36, 0, 11, 23, 0, 9], [[0, 6]], [1]]
    enDict["jiffi"] = [[19, 17, 14, 14, 18], [[0, 2], [3, 4]]]
    enDict["matsu"] = [[22, 2, 31, 29, 34], [[0, 2], [3, 4]]]
    enDict["moholy"] = [[22, 25, 16, 25, 21, 18], [[0, 1], [2, 3], [4, 5]]]
    enDict["namby"] = [[23, 2, 22, 7, 18], [[0, 2], [3, 4]]]
    enDict["pathet"] = [[27, 2, 32, 32, 3, 31], [[0, 1], [2, 5]]]
    enDict["penne"] = [[27, 11, 23, 23, 13], [[0, 2], [3, 4]]]
    enDict["presque"] = [[27, 28, 11, 29, 20, 0, 0], [[0, 2], [3, 6]]]
    enDict["serbo"] = [[29, 12, 12, 7, 25], [[0, 2], [3, 4]]]
    enDict["skrew"] = [[29, 20, 28, 34, 34], [[0, 4]]]
    enDict["st"] = [[[29, 13, 23], 31], [[0, 1]]]
    enDict["takla"] = [[31, 2, 20, 21, 3], [[0, 2], [3, 4]]]
    enDict["thraco"] = [[32, 32, 28, 13, 20, 25], [[0, 3], [4, 5]]]
    enDict["trente"] = [[31, 28, 1, 23, 31, 31], [[0, 5]]]
    enDict["whay"] = [[36, 36, 13, 37], [[0, 3]]]
    enDict["wi"] = [[36, 6], [[0, 1]]]
    enDict["yirng"] = [[37, 17, 28, 24, 24], [[0, 4]]]
    enDict["ylang"] = [[[37, 3], 21, 2, 24, 24], [[0, 4]]]
    enDict["zoot"] = [[38, 34, 34, 31], [[0, 3]]]
    enDict["tabataba"] = [[31, 1, 7, 3, 31, 1, 7, 3], [[0, 1], [2, 3], [4, 5], [6, 7]]]
    enDict["tabatabai"] = [[31, 1, 7, 3, 31, 3, 7, 6, 6], [[0, 1], [2, 3], [4, 5], [6, 8]]]
    enDict["snak"] = [[29, 23, 2, 20], [[0, 3]]]
    enDict["makan"] = [[22, 13, 20, 3, 23], [[0, 1], [2, 4]]]

    console.log('Add missing words')

    return enDict
  }

export default enAddMissingWords
