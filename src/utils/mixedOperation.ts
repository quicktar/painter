/**
 * 用于四则运算的处理对象
 */
export const MixFormulaParser = {
    /** 运算符集合 */
    operators: new Set(['+', '-', '*', '/']),
    /** 小括号 */
    brackets: new Set(['(', ')']),
    numberReg: /^\d+((\.\d+)?)$/,
    /**
     * 计算后缀表达式的值
     * @param {string[]} sufixes 后缀表达式
     * @param {(name: string) => number} getValueByName 根据指定name获取对应的值
     */
    calculate: (sufixes: string[], getValueByName: (name: string) => number) => {
        const stack: number[] = [];
        const { numberReg, operators } = MixFormulaParser;
        for (const item of sufixes) {
            if (operators.has(item)) {
                // 运算符
                const num2 = stack.pop() as number;
                const num1 = stack.pop() as number;
                switch (item) {
                    case '+': {
                        stack.push(num1 + num2);
                        break;
                    }
                    case '-': {
                        stack.push(num1 - num2);
                        break;
                    }
                    case '*': {
                        stack.push(num1 * num2);
                        break;
                    }
                    case '/': {
                        if (num2 == 0) { // 除数为0时，计算结果为0
                            stack.push(0);
                        } else {
                            stack.push(num1 / num2);
                        }
                        break;
                    }
                }
            } else if (numberReg.test(item)) {
                // 是正常的数字
                stack.push(+item);
            } else {
                const tmp = getValueByName(item);
                if (isNaN(tmp)) {
                    return NaN;
                }
                stack.push(tmp);
            }
        }
        return stack.pop() as number;
    },
    /**
     * 根据表达式计算结果
     * @param str 表达式
     * @param getValueByName 根据名称返回目标元素值
     */
    calculateByString: (str: string, getValueByName: (name: string) => number): number => {
        const { toInfixExpressions, toSufixExpressions, calculate } = MixFormulaParser;
        const { infixes, elemNames } = toInfixExpressions(str);
        const sufixes = toSufixExpressions(infixes);
        return calculate(sufixes, getValueByName);
    },
    /**
     * 获取运算符的名称
     * @param {string} operation 运算符
     */
    getOperationValue: (operation: string) => {
        let result = 0;
        switch (operation) {
            case "+":
                result = 1;
                break;
            case "-":
                result = 1;
                break;
            case "*":
                result = 2;
                break;
            case "/":
                result = 3;
                break;
        }
        return result;
    },
    /** 是否是运算符或括号 */
    isSymbols: (str: string): boolean => {
        const { operators, brackets } = MixFormulaParser;
        return operators.has(str) || brackets.has(str);
    },
    /**
     * 替换表达式中的元素内容
     * @param str 源字符串
     * @param target 替换的目标内容
     * @param condition 判断条件
     * @returns [boolean, string] [是否替换， 替换后的字符串]
     */
    replaceElemNames: (str: string, target: string, condition: (name: string) => boolean): [boolean, string] => {
        if (!str) return [false, str];
        let newStr = '';
        let i = 0;
        let hasReplace = false;
        const { isSymbols, numberReg } = MixFormulaParser;
        do {
            if (!isSymbols(str[i])) {
                let value = '';
                if (str[i] === '[') { // 支持'[任意自定义名称]'
                    i++;
                    while (i < str.length && str[i] !== ']') {
                        value += str[i];
                        i++;
                    }
                    i++;
                } else {
                    while (i < str.length && !isSymbols(str[i])) {
                        value += str[i];
                        i++;
                    }
                }
                if (!numberReg.test(value)) {
                    if (condition(value)) {
                        hasReplace = true;
                        newStr += target;
                    } else {
                        newStr += `[${value}]`;
                    }
                } else {
                    newStr += value;
                }
                continue;
            }
            newStr += str[i++];
        } while (i < str.length);
        return [hasReplace, newStr];
    },
    /**
     * 将运算表达式转换为中缀表达式集合
     * @param {string} str 表达式字符串
     * @returns {} {infixes: 中缀表达式集合， elemNames: 元素名集合}
     */
    toInfixExpressions: (str: string): {
        infixes: string[];
        elemNames: string[];
    } => {
        const infixes: string[] = [];
        const elemNames: string[] = []; // 元素名集合
        let i = 0;
        let value = '';
        const { isSymbols, numberReg } = MixFormulaParser;
        // 表达式首项为负数
        if (str[0] === '-') {
            infixes.push('0');
        }
        do {
            if (isSymbols(str[i])) {
                // 运算符+小括号
                infixes.push(str[i]);
                i++;
            } else {
                value = '';
                if (str[i] === '[') { // 支持'[任意自定义名称]'
                    i++;
                    while (i < str.length && str[i] !== ']') {
                        value += str[i];
                        i++;
                    }
                    i++;
                } else {
                    while (i < str.length && !isSymbols(str[i])) {
                        value += str[i];
                        i++;
                    }
                }
                infixes.push(value);
                if (!numberReg.test(value)) {
                    elemNames.push(value);
                }
            }
        } while (i < str.length);
        return {
            elemNames,
            infixes,
        };
    },
    /**
     * 将中缀表达式转换为后缀表达式
     * @param {string[]} infixes 中缀表达式
     * @returns 后缀表达式集合
     */
    toSufixExpressions: (infixes: string[]): string[] => {
        const s1: string[] = []; // 符号栈
        const s2: string[] = []; // 中间结果栈
        const { getOperationValue, operators, numberReg } = MixFormulaParser;
        for (const item of infixes) {
            if (item == '(') { // 左括号
                s1.push(item);
            } else if (item == ')') { // 右括号
                while (s1[s1.length - 1] !== '(') {
                    s2.push(s1.pop() as string);
                }
                s1.pop();
            } else if (operators.has(item)) { // 运算符
                while (s1.length && getOperationValue(s1[s1.length - 1]) >= getOperationValue(item)) {
                    s2.push(s1.pop() as string);
                }
                s1.push(item);
            } else { // 数字 / 元素名称
                s2.push(item);
            }
        }
        while (s1.length) {
            s2.push(s1.pop() as string);
        }
        return s2;
    },
    /**
     * 校验中缀表达式合法性
     * @param infixes 中缀表达式
     * @returns 是否合法
     */
    validateInfixExpression: (infixes: string[]): boolean => {
        const { operators } = MixFormulaParser;
        // 1.操作符"+"，"-"，"*"，"/"不能出现在首位，末位
        if (operators.has(infixes[0]) || operators.has(infixes[infixes.length - 1])) {
            return false;
        }
        // 除了括号，运算符和元素应该是间隔出现
        const bracketStack = []; // 括号栈
        const queue = []; // 内容队列
        for (const item of infixes) {
            if (item === '(') {//左括号入栈
                bracketStack.push(item);
            } else if (item === ')') {//右括号出栈
                if ('(' !== bracketStack.pop()) {
                    return false;
                }
            } else if (operators.has(item)) { // 当前为运算符
                if (operators.has(queue[queue.length - 1])) {
                    // 连续运算符
                    return false;
                }
                queue.push(item);
            } else { // 当前为数字或元素
                if (queue.length && !operators.has(queue[queue.length - 1])) {
                    // 连续数字
                    return false;
                }
                queue.push(item);
            }
        }
        if (bracketStack.length) {
            // 括号不成对
            return false;
        }
        // // 2.操作符"+"，"-"，"*"，"/"“不能连续,括号成对匹配
        // const stack: string[] = [];
        // for (let i = 0; i < infixes.length; i++) {
        //     const char = infixes[i];
        //     if ('(' == char) {//左括号入栈
        //         stack.push(char);
        //     } else if (')' == char) {//右括号出栈
        //         if ('(' !== stack.pop()) {
        //             return false;
        //         }
        //     } else if (operators.has(char) && operators.has(infixes[i - 1])) {//连续操作符
        //         return false;
        //     } else if (!isSymbols(char) && i > 0 && !isSymbols(infixes[i - 1])) { // 连续数字/元素
        //         return false;
        //     }
        // }
        return true;
    },
}