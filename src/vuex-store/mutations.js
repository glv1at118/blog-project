export default {
    changeQueryWord(state, payload) {
        state.queryWord.queryType = payload.queryType;
        state.queryWord.queryContent = payload.queryContent;
    },
    addTag(state, payload) {
        if (payload.newTag === "") {
            return;
        }
        for (let x = 0; x < state.essays.length; x++) {
            if (state.essays[x].essayTitle === payload.targetTitle) {
                let passed = state.essays[x].tags.every((tag) => {
                    if (tag.toUpperCase() !== payload.newTag.trim().toUpperCase()) {
                        return true;
                    }
                });
                if (passed) {
                    state.essays[x].tags.push(payload.newTag.trim());
                    return;
                }
            }
        }
    },
    removeTag(state, payload) {
        for (let y = 0; y < state.essays.length; y++) {
            if (state.essays[y].essayTitle === payload.targetTitle) {
                let positionIndex = state.essays[y].tags.indexOf(payload.tagToRemove);
                state.essays[y].tags.splice(positionIndex, 1);
                return;
            }
        }
    },
    setEditorAreaTrue(state, payload) {
        for (let x = 0; x < state.essays.length; x++) {
            if (state.essays[x].essayTitle === payload) {
                state.essays[x].editorAreaShow = true;
                return;
            }
        }
    },
    setEditorAreaFalse(state, payload) {
        for (let x = 0; x < state.essays.length; x++) {
            if (state.essays[x].essayTitle === payload) {
                state.essays[x].editorAreaShow = false;
                return;
            }
        }
    },
    toggleEditorMode(state) {
        state.editorMode = !state.editorMode;
    },
    addComment(state, payload) {
        for (let x = 0; x < state.essays.length; x++) {
            if (state.essays[x].essayTitle === payload.essayTitle) {
                state.essays[x].commentList.unshift(payload.comment);
                break;
            }
        }
    },
    increaseSum(state, payload) {
        // @params: { essayTitle, index, subIndex, category, deep }
        // category can be "likes"/"shares"/"replies"
        // if deep is true, then it increases the category sum of sub-replies.
        // if deep is false, then if increases the category sum of comments only.

        for (let x = 0; x < state.essays.length; x++) {
            if (state.essays[x].essayTitle === payload.essayTitle) {
                if (payload.deep) {
                    state.essays[x].commentList[payload.index].replyItems[payload.subIndex][payload.category]++;
                    break;
                } else {
                    state.essays[x].commentList[payload.index][payload.category]++
                    break;
                }
            }
        }
    },
    addReplyItem(state, payload) {
        // @params: payload structure --> properties:
        // essayTitle, index (the index for the items in the "commentList" in data), comment
        for (let x = 0; x < state.essays.length; x++) {
            if (state.essays[x].essayTitle === payload.essayTitle) {
                state.essays[x].commentList[payload.index].replyItems.unshift(payload.comment);
                break;
            }
        }
    },
    updateModalDataTemp(state, payload) {
        state.modalDataTemp = {
            essayTitle: payload.essayTitle,
            index: payload.index,
            replyToName: payload.replyToName
        };
    }
}