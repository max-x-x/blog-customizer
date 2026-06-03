import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

const mapStateToCssVariables = (
	articleState: ArticleStateType
): CSSProperties =>
	({
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as CSSProperties);

export const App = () => {
	const [appliedArticleState, setAppliedArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx('index-module__main', styles.main)}
			style={mapStateToCssVariables(appliedArticleState)}>
			<ArticleParamsForm
				initialState={defaultArticleState}
				onApply={setAppliedArticleState}
			/>
			<Article />
		</main>
	);
};
