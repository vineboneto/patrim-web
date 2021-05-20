import './category-list-styles.css'
import { Header, LoadContext, Pagination, Loading, ButtonNew, Error } from '@/presentation/components'
import { ItemProps, Item } from '@/presentation/pages/category-list/components'
import { useErrorHandler } from '@/presentation/hooks'
import { DeleteCategory, LoadCategories } from '@/domain/usecases'

import React, { useState, useEffect } from 'react'
import { CategoryModel } from '@/domain/models'

type Props = {
  loadCategories: LoadCategories
  deleteCategory: DeleteCategory
}

const CategoryList: React.FC<Props> = ({ loadCategories, deleteCategory }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, mainError: error.message, isLoading: false }))
  })
  const [state, setState] = useState({
    isLoading: false,
    openDialog: false,
    mainError: '',
    reload: false,
    totalPage: 1,
    skip: 0,
    take: 18,
    currentPage: 1,
    categories: [] as ItemProps[]
  })

  const setCategories = (categories: CategoryModel[]): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      mainError: '',
      categories: categories.map((category) => ({
        id: category.id.toString(),
        name: category.name
      }))
    }))
  }

  const handleCategories = (data: any): void => {
    if (data) {
      setCategories(data.model)
      setPagination(data.count)
    } else {
      setNotFound()
    }
  }

  const setPagination = (count: number): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      totalPage: Math.ceil(count / state.take)
    }))
  }

  const setNotFound = (): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      categories: [],
      mainError: 'Dados não encontrados'
    }))
  }

  const setLoading = (): void => {
    setState((old) => ({
      ...old,
      isLoading: true
    }))
  }

  const setReload = (): void => {
    setState(old => ({
      ...old,
      reload: !state.reload,
      mainError: '',
      currentPage: 1,
      skip: 0
    }))
  }

  useEffect(() => {
    setLoading()
    loadCategories.load({
      skip: state.skip,
      take: state.take
    })
      .then(data => handleCategories(data))
      .catch(error => handleError(error))
  }, [state.currentPage])

  const handleDelete = (id: number): void => {
    console.log('Entrou')
    deleteCategory.delete({ id: id })
      .then(() => {
        setReload()
      })
      .catch(error => handleError(error))
  }

  return (
    <div className="category-list-wrap" data-testid="categories">
      <Header title="Setores" />
      <div className="container category-list-content">
        <LoadContext.Provider value={{ state, setState }}>
          <div className="row gy-4">
            <ButtonNew to="/categories/new" />
            {state.isLoading && <Loading />}
            {state.mainError && <Error error={state.mainError} handleReload={setReload} />}
            {state.categories.map((category) => (
              <Item
                handleDelete={handleDelete}
                category={category}
                key={category.id}
              />))}
          </div>
          <div className="row">
            <Pagination />
          </div>
        </LoadContext.Provider>
      </div>
    </div>
  )
}

export default CategoryList
