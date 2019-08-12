export default {
    // split the essays (in state) into several groups of small arrays, each contains 12 essays
    // for example: [[{...},{...},{...}], [{...}{...}{...}], [{...}{...}]]
    // so that each sub array can be rendered to a route in the SPA
    essaysInGroup(state) {
        let groupArr = [];
        for (let x = 0; x < Math.ceil(state.essays.length / 12); x++) {
            let start = x * 12;
            let end = start + 12;
            groupArr.push(state.essays.slice(start, end));
        }
        return groupArr;
    },
    filteredEssays(state) {
        let newArr = [];
        if (state.queryWord.queryType === "title") {
            for (let i = 0; i < state.essays.length; i++) {
                let itemTitle = state.essays[i].essayTitle;
                let found = itemTitle.toUpperCase().includes(state.queryWord.queryContent.trim().toUpperCase());
                if (found) {
                    newArr.push(state.essays[i]);
                }
            }
        } else if (state.queryWord.queryType === "tag") {
            for (let j = 0; j < state.essays.length; j++) {
                let tagsArr = state.essays[j].tags;
                for (let k = 0; k < tagsArr.length; k++) {
                    let found = tagsArr[k].toUpperCase().includes(state.queryWord.queryContent.trim().toUpperCase());
                    if (found) {
                        newArr.push(state.essays[j]);
                        break; // break loop to avoid duplication of pushing the same item.
                    }
                }
            }
        }
        return newArr;
    }
}