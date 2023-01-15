class ActionDistributor {
    action: Function|null = null;

    setAction(action: Function) {
        this.action = action;
    }

    callAction(): void {
        if (this.action)
            this.action();
    }
}

export default ActionDistributor;