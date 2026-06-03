import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draftState, setDraftState] = useState<ArticleStateType>(initialState);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!rootRef.current?.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleSidebarToggle = () => {
		setIsOpen((previousValue) => !previousValue);
	};

	const handleArticleFontFamilyChange = (fontFamilyOption: OptionType) => {
		setDraftState((previousState) => ({ ...previousState, fontFamilyOption }));
	};

	const handleArticleFontSizeChange = (fontSizeOption: OptionType) => {
		setDraftState((previousState) => ({ ...previousState, fontSizeOption }));
	};

	const handleArticleFontColorChange = (fontColor: OptionType) => {
		setDraftState((previousState) => ({ ...previousState, fontColor }));
	};

	const handleArticleBackgroundColorChange = (backgroundColor: OptionType) => {
		setDraftState((previousState) => ({ ...previousState, backgroundColor }));
	};

	const handleArticleWidthChange = (contentWidth: OptionType) => {
		setDraftState((previousState) => ({ ...previousState, contentWidth }));
	};

	const handleArticleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(draftState);
	};

	const handleArticleFormReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setDraftState(initialState);
		onApply(initialState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={handleSidebarToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleArticleFormSubmit}
					onReset={handleArticleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<div className={styles.controls}>
						<Select
							title='Шрифт'
							selected={draftState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleArticleFontFamilyChange}
						/>
						<RadioGroup
							name='radio'
							title='Размер шрифта'
							selected={draftState.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleArticleFontSizeChange}
						/>
						<Select
							title='Цвет шрифта'
							selected={draftState.fontColor}
							options={fontColors}
							onChange={handleArticleFontColorChange}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={draftState.backgroundColor}
							options={backgroundColors}
							onChange={handleArticleBackgroundColorChange}
						/>
						<Select
							title='Ширина контента'
							selected={draftState.contentWidth}
							options={contentWidthArr}
							onChange={handleArticleWidthChange}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
